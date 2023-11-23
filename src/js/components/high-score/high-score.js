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

<button>Try again!</button>
`

customElements.define('high-score',
  /**
   * Represents a high-score element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  }
)
