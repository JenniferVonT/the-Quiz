# &lt;nickname-form&gt;

A web component that represents a form to set and show a players nickname.

## Methods

### `addNickname()`

Method that adds the nickname to the player when the submit button is pressed or entered.

#### Parameters

 - `event` (event): The submit event object. This parameter is automatically passed by the browser when the submit button is pressed. It represents the submit event associated with the form.

### `get nickname()`

Gets the nickname for the player.

#### Example
```javascript
// Get the current nickname.
const currentNickname = nickname-form.nickname
console.log(currentNickname) // Output example: Ellen
```

![Example](./img/nicknameInput.PNG)
