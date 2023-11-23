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
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#timerBoard = this.shadowRoot.querySelector('#container')
    }
  })
