# &lt;quiz-question&gt;

A web component that represents quiz questions and eventual answer alternatives.

## Methods

### `showQuestion(object)`

A method that takes an object with a question and none or several answer alternatives and renders them for the user to choose/write.
 - No answer alternatives: writing input, user cannot see any answers.
 - Multiple answer alternatives: radio dials to choose from all the alternatives.

#### Parameters
- `object` (object): An object containing a question and none or multiple answer alternatives.

#### Example
```javascript
const question = {
    question: 'Can pigs fly?',
    alt1: 'Yes',
    alt2: 'No',
    alt3: 'Yes, but only on a plane',
    // ...
}

// Call the method with the example object
quiz-question.showQuestion(question)
```

### `get answer()`

Gets the answer the user gave for the question, if multiple choice the answer will be the alternative (so it will for example give "alt1" and not "Yes" as the answer).

#### Example
```javascript
// Get the answer the user gave, it does not validate if the answer is correct or not.
const answer = quiz-question.answer
console.log(answer) // Output example: 'alt2'
```

## Example

```html
&lt;quiz-question&gt;&lt;/quiz-question&gt;
```
The first is the layout for a question with no answer alternatives sent and the second for a question with multiple answer alternative

![Example](./img/answerInput.PNG)
