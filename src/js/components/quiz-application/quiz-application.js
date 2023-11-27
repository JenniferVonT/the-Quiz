/**
 * The quiz-application web component module.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

import '../nickname-form/'
import '../countdown-timer/'
import '../high-score/'
import '../quiz-question/'

const template = document.createElement('template')
template.innerHTML = `
<style>
  :host {
    display: inline-block;
  }
    button {
        width: 100px;
        height: 30px;
        margin: 2em;
    }
    .hidden {
        display: none;
    }

    countdown-timer {
      margin: 1em;
    }

    high-score {

    }
</style>
<h1>The Quiz</h1>
  <div id="quizRules">
    <p>Answer the questions as fast as possible!</p>
    <p>Right answer moves on to the next round but if you answer wrong or the timer runs out you lose!</p>
    <p><b>Good luck!</b></p>
  </div>
  <nickname-form></nickname-form>
  <quiz-question></quiz-question>
  <countdown-timer time="20"></countdown-timer>
  <high-score></high-score>
  <button>Try Again!</button>
`

customElements.define('quiz-application',
  /**
   * Represents a quiz-application element.
   */
  class extends HTMLElement {
    /**
     * Represents the introduktion text.
     */
    #quizRules

    /**
     * Represents the players nickname.
     */
    #nickname

    /**
     * Represents the countdown clock.
     */
    #timer

    /**
     * Represents quiz question.
     */
    #question

    /**
     * Represents the high-score board.
     */
    #highScore

    /**
     * Represents a button
     */
    #button

    /**
     * Represents the API URL to fetch from
     */
    #QUIZ_API_URL

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Bind the all the relevant components and reset button.
      this.#quizRules = this.shadowRoot.querySelector('#quizRules')
      this.#nickname = this.shadowRoot.querySelector('nickname-form')
      this.#timer = this.shadowRoot.querySelector('countdown-timer')
      this.#question = this.shadowRoot.querySelector('quiz-question')
      this.#highScore = this.shadowRoot.querySelector('high-score')
      this.#button = this.shadowRoot.querySelector('button')

      // Instansiate some variables to save information in.
      this.player = 'Anonymous' // Set the default to Anonymous.
      this.score = 0
      this.#QUIZ_API_URL = 'https://courselab.lnu.se/quiz/question/1'

      // Hide all components that aren't going to be visible in the beginning of the game.
      this.#timer.classList.add('hidden')
      this.#question.classList.add('hidden')
      this.#highScore.classList.add('hidden')
      this.#button.classList.add('hidden')

      // Add event listeners to know when a question has been answered.
      this.#question.addEventListener('submit', () => this.#timer.stopTimer())
      this.#question.addEventListener('submit', () => this.#validateAnswer())
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#nickname.addEventListener('submit', () => this.startGame())
      this.#timer.addEventListener('timeOut', () => this.#restart())
      this.#button.addEventListener('click', () => this.#restart())
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#nickname.removeEventListener('submit', () => this.startGame())
      this.#timer.removeEventListener('timeOut', () => this.#restart())
      this.#button.removeEventListener('click', () => this.#restart())
    }

    /**
     * Starts the game from the beginning.
     */
    startGame () {
      // If the nickname is not hidden yet, hide it and show the relevant game components.
      if (!this.#nickname.classList.contains('hidden')) {
        this.#quizRules.classList.add('hidden')
        this.#nickname.classList.add('hidden')
        this.#timer.classList.toggle('hidden')
        this.#question.classList.toggle('hidden')
      }

      // Get the current player nickname and start with the first question.
      this.player = this.#nickname.nickname
      this.#handleQuestion()
    }

    /**
     * Handles the communication bewteen the server and components regarding the questions.
     */
    async #handleQuestion () {
      // Fetch the question from the API.
      const response = await fetch(this.#QUIZ_API_URL)

      // Check if the response is successful.
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      // Set the time limit attribute if there is a limit in the data object.
      if ('limit' in data) {
        this.#timer.updateTimer(data.limit)
      }

      this.#timer.startTimer()

      // Bind the nextURL for the answer validation.
      this.#QUIZ_API_URL = data.nextURL

      // Check the properties and push the question and eventual alt properties into a new object.
      const questionObject = {}

      if ('alternatives' in data) {
        questionObject.question = data.question

        const altKeys = Object.keys(data.alternatives)

        for (const alt of altKeys) {
          questionObject[alt] = data.alternatives[alt].toString()
        }
      } else {
        questionObject.question = data.question
      }

      // Render the question and eventual answer alternatives.
      this.#question.showQuestion(questionObject)
    }

    /**
     * Handles the validation of the players answer.
     */
    async #validateAnswer () {
      const userAnswer = this.#question.answer

      // Send the users answer and fetch the next object from the API.
      const response = await fetch(this.#QUIZ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: userAnswer })
      })

      // If the answer is wrong, or the fetch fails restart the quiz. If it is correct continue.
      if (!response.ok) {
        this.#restart()
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      // Validate if it is the last question or not.
      if ('nextURL' in data) {
        // If there is more questions, bind the next URL, save the score and go to the next question.
        this.#QUIZ_API_URL = data.nextURL

        this.score += this.#timer.timeToFinish

        this.#handleQuestion()
      } else {
        // If it is the last question save the score and end the game.
        this.score += this.#timer.timeToFinish
        this.#endGame()
      }
    }

    /**
     * Handles the communication bewteen the webStorage and the high-score component to render the high-score list.
     */
    async #handleScore () {
      // Get all the players and their scores stored in localStorage.
      const storedPlayers = JSON.parse(localStorage.getItem('quiz_highscore')) || []

      // Add the current player and their score.
      storedPlayers.push({ player: this.player, score: this.score })

      // Save the updated list back to localStorage.
      localStorage.setItem('quiz_highscore', JSON.stringify(storedPlayers))

      // Convert the storedPlayers array into an object with the correct structure for the high-school component.
      const playerScoresObject = storedPlayers.reduce((acc, player) => {
        acc[player.player] = player.score
        return acc
      }, {})

      // Update the high-score component to render the list.
      this.#highScore.buildList(playerScoresObject)
    }

    /**
     * Ends the game and shows you the high-score list.
     */
    #endGame () {
      this.#handleScore()
      // Toggle the hidden class to show and hide the relevant components.
      this.#question.classList.toggle('hidden')
      this.#highScore.classList.toggle('hidden')
      this.#button.classList.toggle('hidden')
      this.#timer.classList.toggle('hidden')
    }

    /**
     * Restarts the game to the beginning.
     */
    #restart () {
      // Check what components are hidden or not and change accordingly so it's back to the start.
      if (!this.#question.classList.contains('hidden')) {
        this.#question.classList.add('hidden')
      }

      if (!this.#timer.classList.contains('hidden')) {
        this.#timer.classList.add('hidden')
      }

      if (!this.#highScore.classList.contains('hidden')) {
        this.#highScore.classList.add('hidden')
      }

      if (!this.#button.classList.contains('hidden')) {
        this.#button.classList.add('hidden')
      }

      if (this.#quizRules.classList.contains('hidden')) {
        this.#quizRules.classList.remove('hidden')
      }

      if (this.#nickname.classList.contains('hidden')) {
        this.#nickname.classList.remove('hidden')
      }

      // Wipe all the player info and reset the API URL and timer.
      this.player = ''
      this.score = 0
      this.#QUIZ_API_URL = 'https://courselab.lnu.se/quiz/question/1'
      this.#timer.updateTimer('20')
    }
  }
)
