/**
 * The main script file of the application.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

import './components/nickname-form/'
import './components/countdown-timer/'
import './components/high-score/'
import './components/quiz-question/'
import './components/quiz-application/'

const scoreList = {
  Kalle: '63',
  Jennifer: '55',
  Frida: '95'
}

const highScore = document.querySelector('high-score')

highScore.buildList(scoreList)
/*
<li id="1"></li>
<li id="2"></li>
<li id="3"></li>
<li id="4"></li>
<li id="5"></li>
*/
