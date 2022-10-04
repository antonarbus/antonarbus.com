const assert = require('assert')

describe.only('node assert', function () {
  it('ifError', function () {
    assert.ifError(null)
    assert.ifError(0) // fail
    assert.ifError('error') // fail
    assert.ifError(new Error()) // fail
  })
})
