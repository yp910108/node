const {should, expect, assert} = require('chai')
const {add, mul} = require('../src/math')

// if (add(2, 3) === 5) {
//   console.log('add(2, 3) === 5, OK')
// } else {
//   console.log('add(2, 3) !== 5, ERROR')
// }

// assert.equal(add(2, 3), 5)

should()

add(2, 3).should.equal(5)

expect(add(2, 3)).to.equal(5)

assert.equal(add(2, 3), 5)
