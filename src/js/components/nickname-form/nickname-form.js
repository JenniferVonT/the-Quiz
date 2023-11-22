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
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  })
