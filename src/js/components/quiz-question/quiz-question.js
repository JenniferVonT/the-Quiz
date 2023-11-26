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
        width: 600px;
    }

    fieldset {
        background-color: #fce6de;
        border: solid black 2px;
        padding: 2em;
        margin: 2em;
        height: min-content;
    }

    #multipleChoice {
        display: grid;
        gap: 1em;
    }
    
    .hidden {
        display: none !important;
    }

    h2 {
      height: 20px;
    }

</style>

  <form id="answer" method="POST">
    <h2 id="question"></h2>

    <fieldset id="writtenAnswer">
      <input type="text" class="final" autocomplete="off" autofocus />
    </fieldset>

    <fieldset id="multipleChoice">
      <!--Prepend input with radio dials for each answer-->
    </fieldset>

    <input type="submit" value="send" class="final" />
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
     * Represents the radio input values when there's multiple choice questions.
     */
    #radioInput

    /**
     * Represents the written answer when there isn't multiple choice questions.
     */
    #singleInput

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Bind the relevant elements.
      this.#writtenAnswer = this.shadowRoot.querySelector('#writtenAnswer')
      this.#multipleChoice = this.shadowRoot.querySelector('#multipleChoice')
      this.#question = this.shadowRoot.querySelector('#question')
      this.#form = this.shadowRoot.querySelector('form')
      this.#finalAnswer = {}
      this.#singleInput = this.shadowRoot.querySelector('.final')
      this.#multipleChoice.classList.add('hidden')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#form.addEventListener('submit', event => this.#addAnswer(event))
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#form.removeEventListener('submit', event => this.#addAnswer(event))
    }

    /**
     * Adds the submit input event value to the variable #finalAnswer.
     *
     * @param {Event} event - A submit event on a form.
     */
    #addAnswer (event) {
      event.preventDefault()

      this.#radioInput = this.shadowRoot.querySelector('input[name="answers"]:checked')

      if (!this.#multipleChoice.classList.contains('hidden')) {
        this.#finalAnswer = this.#radioInput ? this.#radioInput.value.split(':')[0].trim() : null
      } else {
        this.#finalAnswer = this.#singleInput.value
      }

      const sendAnswer = new Event('submit', {
        bubbles: true,
        composed: true
      })
      this.dispatchEvent(sendAnswer)

      this.reset()
    }

    /**
     * Resets the state of the quiz-question component.
     */
    reset () {
      this.#singleInput.value = ''
      const radioInputs = this.shadowRoot.querySelectorAll('label')
      radioInputs.forEach(input => input.remove())
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
    showQuestion (questionObject) {
      this.#updateHiddenClass(questionObject)

      const { question, ...alternatives } = questionObject

      this.#question.textContent = question
      const alt1 = 'alt1'

      // When it is a multiple choice question, create input elements.
      if (alt1 in questionObject) {
        for (const [key, value] of Object.entries(alternatives)) {
          // Create all neccessary elements and set attributes.
          const input = document.createElement('input')
          const label = document.createElement('label')
          const answerAlt = document.createTextNode(value)
          input.setAttribute('type', 'radio')
          input.setAttribute('name', 'answers')
          input.setAttribute('value', `${key}: ${value}`)

          // Put them all together.
          label.append(answerAlt)
          label.append(input)

          this.#multipleChoice.append(label)
        }
      }
    }

    /**
     * Update the hidden class if the question is a multiple choice answer or not.
     *
     * @param {object} question - The object with questions and answer alternatives.
     */
    #updateHiddenClass (question) {
      if ('alt1' in question && this.#multipleChoice.classList.contains('hidden')) {
        this.#multipleChoice.classList.toggle('hidden')
        this.#writtenAnswer.classList.toggle('hidden')
      } else if (!('alt1' in question) && this.#writtenAnswer.classList.contains('hidden')) {
        this.#multipleChoice.classList.toggle('hidden')
        this.#writtenAnswer.classList.toggle('hidden')
      }
    }
  }
)
