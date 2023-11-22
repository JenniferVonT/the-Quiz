# &lt;nickname-form&gt;

A web component that represents a form to set and show a players nickname.

## Methods

### `setNickname(value)`

Sets the nickname for the component.

#### Parameters
 - `value` (string): The new nickname to set.

#### Example
```javascript
// Set the nickname to 'Ellen'
nickname-form.setNickname('Ellen')
```

### `getNickname()`

Gets the nickname for the component.

#### Returns
 - (string): The current nickname.

#### Example
```javascript
// Get the current nickname
const currentNickname = nickname-form.getNickname()
console.log(currentNickname) // Output: Ellen
```
