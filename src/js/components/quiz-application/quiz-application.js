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
    button {
        width: 100px;
        height: 30px;
        margin: 2em;
    }
    .hidden {
        display: none;
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
  <countdown-timer></countdown-timer>
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
     * All the players saved on the WebStorage including the current player.
     */
    #allPlayersList

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

      // Bind the all the components and button.
      this.#quizRules = this.shadowRoot.querySelector('#quizRules')
      this.#nickname = this.shadowRoot.querySelector('nickname-form')
      this.#timer = this.shadowRoot.querySelector('countdown-timer')
      this.#question = this.shadowRoot.querySelector('quiz-question')
      this.#highScore = this.shadowRoot.querySelector('high-score')
      this.#button = this.shadowRoot.querySelector('button')

      // Instansiate some variables to save information in.
      this.player = ''
      this.score = 0
      this.#allPlayersList = {}
      this.#QUIZ_API_URL = 'https://courselab.lnu.se/quiz/question/1'

      // Hide all components that aren't going to be visible in the beginning of the game.
      this.#timer.classList.add('hidden')
      this.#question.classList.add('hidden')
      this.#highScore.classList.add('hidden')
      this.#button.classList.add('hidden')
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#nickname.addEventListener('submit', () => this.#handleQuestion())
      this.#timer.addEventListener('timeOut', () => this.#restart())
      this.#question.addEventListener('submit', () => this.#validateAnswer())
      this.#button.addEventListener('click', () => this.#restart())
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#nickname.removeEventListener('submit', () => this.#handleQuestion())
      this.#timer.removeEventListener('timeOut', () => this.#restart())
      this.#question.removeEventListener('submit', () => this.#validateAnswer())
      this.#button.removeEventListener('click', () => this.#restart())
    }

    /**
     * Handles the communication bewteen the server and components regarding the questions.
     */
    async #handleQuestion () {
    // toggle what is to be shown.
      if (!this.#nickname.classList.contains('hidden')) {
        this.#quizRules.classList.add('hidden')
        this.#nickname.classList.add('hidden')
        this.#timer.classList.toggle('hidden')
        this.#question.classList.toggle('hidden')
      }

      // Fetch the question from the API.
      const response = await fetch(this.#QUIZ_API_URL)

      // Check if the response is successfull.
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      // Extrapolate the nextURL
      this.#QUIZ_API_URL = data.nextURL
      // Extrapolate the time limit.
      const limit = parseInt(data.limit)
      this.#timer.setAttribute('time', `${limit}`)
      // Filter the properties and push the question and alt properties into a new object.
      const questionObject = {}
      for (const [key, value] of Object.entries(data)) {
        if (/^alt\d\d?$/.test(key) || /^question$/.test(key)) {
          questionObject[key] = value
        }
      }

      this.#timer.startTimer()
      // Call the quiz-question component and countdown-timer component
      this.#question.showQuestion(questionObject)
    }

    /**
     * Handles the validation of the players answer.
     */
    async #validateAnswer () {
      this.#timer.stopTimer()
      const userAnswer = this.#question.answer

      // Send the users answer and fetch the next object from the API.
      const response = await fetch(this.#QUIZ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: userAnswer })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      // Validate if the answer is correct.
      /*if (/^You are outstanding!$/.test(data.message)) {
        this.#QUIZ_API_URL = data.nextURL

        this.score += this.#timer.timeToFinish

        this.#handleQuestion()
      } else if (/^Well done!$/.test(data.message)) {
        this.#endGame()
      } else {
        this.#restart()
      }*/
    }

    /**
     * Handles the communication bewteen the webStorage and components regarding the players and scores.
     */
    async #handleScore () {
      this.player = this.#nickname.nickname
      // Create a fetch statement for the player list in the webStorage and assign it to this.#allPlayersList also add the current player.
    }

    /**
     * Ends the game and shows you the high-score list.
     */
    #endGame () {
      this.#question.classList.toggle('hidden')
      this.#highScore.classList.toggle('hidden')
      this.#button.classList.toggle('hidden')
      this.#timer.classList.toggle('hidden')
      this.#handleScore()
    }

    /**
     * Restarts the game to the beginning.
     */
    #restart () {
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

      this.player = ''
      this.score = 0
      this.#QUIZ_API_URL = 'https://courselab.lnu.se/quiz/question/1'
    }
  }
)
