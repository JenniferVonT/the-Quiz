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
        display: block;
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
    <ol id="list"></ol>
</div>
`

customElements.define('high-score',
  /**
   * Represents a high-score element.
   */
  class extends HTMLElement {
    /**
     * Represents the list.
     */
    #scoreList

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#scoreList = this.shadowRoot.querySelector('#list')
    }

    /**
     * Builds the high-score list.
     *
     * @param {object} listObject - An object with a list of player nicknames and their scores.
     */
    buildList (listObject) {
      // Check if there are existing li elements and remove them.
      const existingLiElements = this.#scoreList.querySelectorAll('li')
      existingLiElements.forEach((li) => li.remove())

      // Turn the object into an array and sort it from smallest to largest score.
      const players = Object.entries(listObject)

      players.forEach(([player, score], i) => {
        players[i][1] = parseInt(score, 10)
      })

      players.sort((a, b) => a[1] - b[1])

      // Start a counter and append list items with the top 5 players into the ol list.
      for (let i = 0; i < 5; i++) {
        const liElement = document.createElement('li')
        const player = players[i]

        if (player !== undefined) {
          const playerAndScore = document.createTextNode(`${player[0]}: ${player[1]}`)
          liElement.append(playerAndScore)
          this.#scoreList.append(liElement)
        }
        // If there is no players just append an empty list element.
        this.#scoreList.append(liElement)
      }
    }
  }
)
