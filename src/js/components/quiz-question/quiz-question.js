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
        background-color: #ffffff;
        width: 50vw;
    }

    .hidden {
        display: none;
    }

</style>

<h2 id="question"></h2>
  <form id="answer" method="POST">
    <fieldset id="writeAnswer">
      <input type="text">
      <input type="submit" value="send">
    </fieldset>

    <fieldset id="multipleChoice">
      <!--Prepend input with radio dials for each answer-->
      <input type="submit" value="send">
    </fieldset>
  </form>
`

customElements.define('quiz-question',
  /**
   * Represents a quiz-question element
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: open })
        .appendChild(template.content.cloneNode(true))
    }
  }
)
