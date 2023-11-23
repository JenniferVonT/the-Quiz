# &lt;quiz-question&gt;

A web component that represents quiz questions and answers.

## Methods

### `showQuestion(object)`

A method that takes an object with a question and one or several answers and renders them for the user to choose.
 - One answer: writing input, answer is not shown to the user.
 - Multiple answers: radio dials to choose from all the answers.

#### Parameters
- `object` (object): An object containing a question and one or multiple strings with answer choices.

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

Gets the answer the user gave for the question.

#### Example
```javascript
// Get the answer the USER gave, not neccessarily the right choice.
const answer = quiz-question.answer
console.log(answer) // Output example: alt2: 'no'
```
