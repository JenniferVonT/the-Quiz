/**
 * The quiz-question web component module.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        display: inline-block;
        background-color: rgba(0, 0, 0, 0);
        width: 30vw;
    }

    fieldset {
        background-color: #fce6de;
        border: solid black 2px;
        padding: 2em;
        margin: 2em;
    }

    #multipleChoice {
        display: grid;
        gap: 0.6em;
        grid-template-columns: 3fr 1fr;
    }
    
    .hidden {
        display: none !important;
    }

</style>

<h2 id="question"></h2>
  <form id="answer" method="POST">

    <fieldset id="writtenAnswer">
      <input type="text">
    </fieldset>

    <fieldset id="multipleChoice">
      <!--Prepend input with radio dials for each answer-->
    </fieldset>

    <input type="submit" value="send" class="final">
  </form>
`

customElements.define('quiz-question',
  /**
   * Represents a quiz-question element
   */
  class extends HTMLElement {
    /**
     * Represents the element with a written answer input.
     */
    #writtenAnswer

    /**
     * Represents the element with multiple choice answers.
     */
    #multipleChoice

    /**
     * Represents the question.
     */
    #question

    /**
     * Represents the form element.
     */
    #form

    /**
     * Represents the answer the user sends.
     */
    #finalAnswer

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#writtenAnswer = this.shadowRoot.querySelector('#writtenAnswer')
      this.#multipleChoice = this.shadowRoot.querySelector('#multipleChoice')
      this.#question = this.shadowRoot.querySelector('#question')
      this.#form = this.shadowRoot.querySelector('form')
      this.#finalAnswer = {}
      this.input = this.shadowRoot.querySelector('.final')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#form.addEventListener('submit', event => this.addAnswer(event))
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#form.removeEventListener('submit', event => this.addAnswer(event))
    }

    /**
     * Adds the submit input event value to the variable #finalAnswer.
     *
     * @param {Event} event - A submit event.
     */
    addAnswer (event) {
      event.stopDefault()
      this.#finalAnswer = this.input.value
    }

    /**
     * Returns the users final answer they sent in.
     *
     * @returns {object} - an object with the key alternative and value answer.
     */
    get answer () {
      return this.#finalAnswer
    }

    /**
     * Takes the question and it's answer alternatives and shows the user.
     *
     * @param {object} questionObject - containing string values with questions and answers.
     */
    showQuestion (questionObject) {}

    /**
     * Update the rendering being shown to the user.
     */
    #updateRender () {}
  }
)
