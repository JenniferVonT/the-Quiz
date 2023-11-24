/**
 * The nickname-form web component module.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
    font-size: 1.2rem;
    text-decoration: underline;
}
input {
    border: solid black 1px;
    text-decoration: none;
}
</style>

<h2>&#9829; Write player nickname to begin! &#9829;</h2>

<form id="sendNickname" method="POST">
  <input type="text" id="nickname">
  <input type="submit" value="Continue">
</form>
`

customElements.define('nickname-form',
  /**
   * Represents a nickname-form element.
   */
  class extends HTMLElement {
    /**
     * Represents the nickname.
     */
    #nickname

    /**
     * Represents the form element.
     */
    #form

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the form element in the shadow root.
      this.#form = this.shadowRoot.querySelector('form')

      // Set the default nickname to anonymous.
      this.#nickname = 'anonymous'
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Set the eventlistener to save the nickname in the this.#nickname field.
      this.#form.addEventListener('submit', (event) => this.addNickname(event))
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#form.removeEventListener('submit', (event) => this.addNickname(event))
    }

    /**
     * Get the current nickname.
     *
     * @returns {string} - A string representing the player nickname.
     */
    get nickname () {
      return this.#nickname
    }

    /**
     * Sets the nickname when the submit event is fired.
     *
     * @param {SubmitEvent} event - Set off by the event.
     */
    addNickname (event) {
      event.preventDefault()

      const inputNickname = this.shadowRoot.querySelector('#nickname').value.toString()

      // Validate the input for length and some special characters for safety.
      if ((inputNickname.length !== 0 || inputNickname.lenght < 20) && !(inputNickname.includes('&') || inputNickname.includes('<'))) {
        this.#nickname = inputNickname
      }
      this.dispatchEvent('submit')
    }
  })
