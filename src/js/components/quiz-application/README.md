# &lt:quiz-application&gt;

A web component that represents a quiz application.

## Methods (private)

### `#handleQuestion()`

Handles the connection between the quiz-question and countdown-timer components and communicates with the server to fetch questions.

### `#handleScore()`

Manages the interaction between the high-score and nickname-form components, updating WebStorage with player scores.

### `#endGame()`

Ends the current game, showing the high score list to the player.

## Example
Start a new quiz game by including the &lt;quiz-application&gt; element  in your HTML. The component manages the game flow, question and player scores.

```html
&lt;quiz-application&gt;&lt;/quiz-application&gt;
```
