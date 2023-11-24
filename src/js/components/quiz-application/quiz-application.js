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
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#quizRules = this.shadowRoot.querySelector('#quizRules')
      this.#nickname = this.shadowRoot.querySelector('nickname-form')
      this.#timer = this.shadowRoot.querySelector('countdown-timer')
      this.#question = this.shadowRoot.querySelector('quiz-question')
      this.#highScore = this.shadowRoot.querySelector('high-score')
      this.#button = this.shadowRoot.querySelector('button')

      // Hide all components that aren't going to be visible in the beginning of the game.
      this.#timer.classList.add('hidden')
      this.#question.classList.add('hidden')
      this.#highScore.classList.add('hidden')
      this.#button.classList.add('hidden')

      this.player = ''
      this.score = 0
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#nickname.addEventListener('submit', () => this.#handleQuestion())
      this.#timer.addEventListener('timeOut', () => this.#endGame())
      this.#question.addEventListener('submit', () => this.#handleScore())
      this.#button.addEventListener('click', () => this.#restart())
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#nickname.removeEventListener('submit', () => this.#handleQuestion())
      this.#timer.removeEventListener('timeOut', () => this.#endGame())
      this.#question.removeEventListener('submit', () => this.#handleScore())
      this.#button.removeEventListener('click', () => this.#restart())
    }

    /**
     * Handles the communication bewteen the server and components regarding the questions and answers.
     */
    #handleQuestion() {}

    /**
     * Handles the communication bewteen the webStorage and components regarding the players and scores.
     */
    #handleScore () {}

    /**
     * Ends the game and shows you the high-score list.
     */
    #endGame () {
      this.#highScore.classList.toggle('hidden')
      this.#button.classList.toggle('hidden')
    }

    /**
     * Restarts the game to the beginning.
     */
    #restart () {}
  }
)
