import Tile from '../Tile'

describe('Test Tile class', () => {

  test('constructor', () => {
    const value = 'Spiderman'
    const tile = new Tile<string>(value, true)
    expect(tile.value).toBe(value)
    expect(tile.isRevealed).toBe(true)
  })

  test('constructor with default optional param', () => {
    const value = 'Spiderman'
    // 'string' type is inferred from `value`, so
    // specifying the type wrapped in '<>' is not
    // necessary.
    const tile = new Tile(value)
    expect(tile.value).toBe(value)
    expect(tile.isRevealed).toBe(false)
  })

  test('reveal', () => {
    const value = 'Spiderman'
    const tile = new Tile(value)
    tile.reveal()
    expect(tile.isRevealed).toBe(true)
  })

  test('conceal', () => {
    const value = 'Spiderman'
    const tile = new Tile(value)
    tile.reveal()
    tile.conceal()
    expect(tile.isRevealed).toBe(false)
  })

  test('toggle', () => {
    const value = 'Spiderman'
    const tile = new Tile(value, false)
    tile.toggle()
    expect(tile.isRevealed).toBe(true)
  })

  test('toString', () => {
    const tile1 = new Tile("A", false)
    expect(tile1.toString()).toBe("?")
    tile1.toggle()
    expect(tile1.toString()).toBe("A")

    const tile2 = new Tile(1, true)
    expect(tile2.toString()).toBe("1")

    const tile3 = new Tile(true, true)
    expect(tile3.toString()).toBe("true")
  })

})