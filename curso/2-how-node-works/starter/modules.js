/**
 * console.log(arguments) => to see module data information (arguments)
 */
// console.log(arguments)

// console.log('___________________________________________________');

/**
 * '(function (exports, require, module, __filename, __dirname) { ',
 * '\n});'
 */
// console.log(require('module').wrapper)

/**
 * Using classes usually we must use uppercase
 */
// module.exports
const C = require('./test-module-1')
const calc1 = new C()

console.log(calc1.add(2, 5))

// exports
// const calc2 = require('./test-module-2')
const { add, multiply, divide } = require('./test-module-2')
console.log(add(2, 6))
console.log(multiply(2, 5))
console.log(divide(2, 5))

// caching
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()