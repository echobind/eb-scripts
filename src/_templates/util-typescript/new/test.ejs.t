---
to: <%= root %>/<%= path %>/<%= name %>/test.ts
---
import <%= name %> from './<%= name %>'

describe('no arguments', () => {
  test('returns something expected', () => {
    expect(true).toBe(false)
  })
})
