/**
 * The main script file of the application.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

import './components/my-hello/index.js'

const messageContainer = document.querySelector('#messageContainer')
const message = document.createTextNode('Hi from an ECMAScript Module.')
messageContainer.appendChild(message)

// TODO: This is just some example code that you are free to use, modify or completely delete.
