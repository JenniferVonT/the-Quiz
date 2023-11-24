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
    }

    connectedCallback () {
    // this.#timer.addEventListener('timeOut', () => endGame())
    }

    disconnectedCallback () {}

    endGame () {}
  }
)
