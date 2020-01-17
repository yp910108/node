const {should, expect, assert} = require('chai')
const {add, mul, cover} = require('../src/math')

describe('#math', () => {
  describe('add', () => {
    it('should return 5 when 2 + 3', () => {
      assert.equal(add(2, 3), 5)
    })
    it('should return -1 when 2 + -3', () => {
      assert.equal(add(2, -3), -1)
    })
  })
  describe('mul', () => {
    it('should return 6 when 2 * 3', () => {
      assert.equal(mul(2, 3), 6)
    })
  })
  describe('cover', () => {
    it('should return 1 when cover(2, 1)', () => {
      assert.equal(cover(2, 1), 1)
    })
  })
  describe('cover', () => {
    it('should return 6 when cover(3, 3)', () => {
      assert.equal(cover(3, 3), 6)
    })
  })
  describe('cover', () => {
    it('should return 3 when cover(2, 3)', () => {
      assert.equal(cover(2, 3), 3)
    })
  })
})
