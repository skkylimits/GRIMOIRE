// eslint-test.js

const foo = 42 // Missing semicolon at the end of the line

const bar = 'Hello, World!'

function calculateSum(a, b) {
	const sum = a + b
	console.log(sum)
}

calculateSum(3, 4)

function sayHello(name) {
	console.log(`Hello, ${name}`)
}

sayHello('John')

const unusedVariable = 123 // Unused variable

if (bar) {
	console.log(bar)
}
else {
	console.log('No value') // Incorrect indentation
}
