import { Greeter } from '../index'

test('My Greeter', () => {
  expect(Greeter('Max')).toBe('Hello Max')
})