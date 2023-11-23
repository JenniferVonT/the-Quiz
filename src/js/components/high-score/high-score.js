/**
 * The high-score web component module.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
    :host {
        display: inline-block;
        background-color: #fce6de;
        width: 350px;
        height: min-content;
        border: solid black 2px; 
    }

    button {
        width: 100px;
        height: 30px;
        margin-bottom: 1em;
    }

</style>
<div id="container">
    <p>Top 5 players!</p>
    <i>(names and seconds of the quickest players)</i>
    <ol>
        <li id="1"></li>
        <li id="2"></li>
        <li id="3"></li>
        <li id="4"></li>
        <li id="5"></li>
    </ol>
</div>
`

customElements.define('high-score',
  /**
   * Represents a high-score element.
   */
  class extends HTMLElement {
    /**
     * Represents the first place on the list.
     */
    #firstPlace

    /**
     * Represents the second place on the list.
     */
    #secondPlace

    /**
     * Represents the third place on the list.
     */
    #thirdPlace

    /**
     * Represents the fourt place on the list.
     */
    #fourthPlace

    /**
     * Represents the fift place on the list.
     */
    #fifthPlace

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#firstPlace = this.shadowRoot.querySelector('#1')
      this.#secondPlace = this.shadowRoot.querySelector('#2')
      this.#thirdPlace = this.shadowRoot.querySelector('#3')
      this.#fourthPlace = this.shadowRoot.querySelector('#4')
      this.#fifthPlace = this.shadowRoot.querySelector('#5')
    }

    /**
     * Builds the high-score list.
     *
     * @param {object} listObject - An object with a list of player nicknames and their scores.
     */
    buildList (listObject) {}
  }
)
