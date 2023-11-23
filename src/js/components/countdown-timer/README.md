# &lt;countdown-timer&gt;

A web component that represents a countdown timer.

## Attributes

### `time`

A string attribute, if present, that contains the time in seconds set to the timer.

Default value: 20 seconds.

## Methods

### `get timeLeft`
 
Gets the time left on the timer.

#### Example

```javascript
// Get the time that is left on the timer.
const timeLeft = countdown-timer.timeLeft
console.log(timeLeft) // Output example: 10
```

## Example

```html
<countdown-timer time="15"></countdown-timer>
```
