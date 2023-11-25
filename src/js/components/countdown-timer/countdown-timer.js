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
        background-color: #fce6de;
        width: 150px;
        padding: 5px;
        border: solid black 2px;
        box-shadow: 2px 3px 5px 2px gray;
    }
    #timer {
        font-size: 1.5rem;
    }
    .warning {
      color: red;
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
     * Represents the timer.
     */
    #countdown

    /**
     * Represents the time it took from start to stop.
     */
    #timeLeft

    /**
     * Gets the timer to stop and start.
     */
    #run

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#countdown = this.shadowRoot.querySelector('#timer')
      this.#timeLeft = ''
      this.#run = true
    }

    /**
     * Attribute to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['time']
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.updateTimer('20')
      this.#upgradeProperty('time')
      this.#countdown.classList.remove('warning')
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallbak () {
      this.stopTimer()
      this.#countdown.classList.remove('warning')
    }

    /**
     * Updates the timer attribute.
     *
     * @param {string} time - a string with a number representing the time limit on the timer.
     */
    updateTimer (time) {
      this.setAttribute('time', time)
      clearInterval(this.count)
    }

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
     * Get the time it took from start to finish in seconds.
     *
     * @returns {number} - The number of seconds.
     */
    get timeToFinish () {
      const startTotal = parseInt(this.getAttribute('time'), 10)
      return startTotal - this.#timeLeft
    }

    /**
     * Method that start and runs the timer.
     */
    startTimer () {
      clearInterval(this.count)

      let startTime = parseInt(this.getAttribute('time'), 10)
      this.#timeLeft = startTime

      // Set an interval of 1sec and update the number shown every second.
      this.count = setInterval(() => {
        if (this.#run && startTime >= 0) {
          this.#updateRender(startTime)
          startTime--
          this.#timeLeft = startTime
        }

        // If the timer hits 0, stop it and trigger a dispatchEvent.
        if (startTime < 0) {
          this.stopTimer()

          const event = new Event('timeOut', {
            bubbles: true,
            composed: true
          })
          this.dispatchEvent(event)
        }
      }, 1000)
    }

    /**
     * Method that stops the timer.
     */
    stopTimer () {
      this.#run = false
      clearInterval(this.count)
    }

    /**
     * Update the rendering for the timer.
     *
     * @param {string} time - A string representing the time left to be shown to the user.
     */
    #updateRender (time) {
      if (time > 4) {
        this.#countdown.textContent = `${time}`
      } else if (time >= 0) {
        this.#countdown.classList.add('warning')
        this.#countdown.textContent = `${time}`
      }
    }
  })
