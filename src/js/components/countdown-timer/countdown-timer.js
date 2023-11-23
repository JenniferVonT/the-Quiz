/**
 * The countdown-timer web component module.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        display: block;
        background-color: #f0d9aa;
        width: 150px;
        padding: 5px;
        border: solid black 2px;
        box-shadow: 2px 3px 5px 2px gray;
    }
    #timer {
        font-size: 1.5rem;
    }
</style>
<div id="container">
    <p>Time left: <b id="timer"></b></p>
</div>
`

customElements.define('countdown-timer',
  /**
   * Represents a countdown-timer element.
   */
  class extends HTMLElement {
    /**
     * The container for the timer element.
     */
    #timerBoard

    /**
     * Represents the timer.
     */
    #timer

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#timerBoard = this.shadowRoot.querySelector('#container')
      this.#timer = this.shadowRoot.querySelector('#timer')
    }

    /**
     * Attribute to monitor for changes.
     *
     * @returns {string[]} A string arrat of attributes to monitor.
     */
    static get observedAttributes () {
      return ['time']
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      if (!this.hasAttribute('time')) {
        this.setAttribute('time', '20')
      }

      this.#upgradeProperty('time')
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    // disconnectedCallbak () {}

    /**
     * Run the specified instance property
     * through the class setter.
     *
     * @param {string} prop - The property's name.
     */
    #upgradeProperty (prop) {
      if (Object.hasOwnProperty.call(this, prop)) {
        const value = this[prop]
        delete this[prop]
        this[prop] = value
      }
    }

    /**
     * Get the time left on the timer.
     *
     * @returns {string} - A string representing the number of seconds left.
     */
    get timeLeft () {
      return this.#timer.textContent
    }

    /**
     * Method that start and runs the timer.
     */
    startTimer () {}

    /**
     * Update the rendering for the timer.
     *
     * @param {string} time - A string representing the time left to be shown to the user.
     */
    updateRender (time) {
      this.#timer.textContent = `${time}`
    }
  })
