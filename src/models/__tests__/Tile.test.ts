import Tile from '../Tile'

describe('Test Tile class', () => {

  test('constructor', () => {
    const data = 'Spiderman'
    const tile = new Tile<string>(data, true)
    console.log(tile)
    expect(tile.data).toBe(data)
    expect(tile.isRevealed).toBe(true)
  })

  test('constructor with default optional param', () => {
    const data = 'Spiderman'
    // 'string' type is inferred from `data`, so
    // specifying the type wrapped in '<>' is not
    // necessary.
    const tile = new Tile(data)
    expect(tile.data).toBe(data)
    expect(tile.isRevealed).toBe(false)
  })

  test('reveal', () => {
    const data = 'Spiderman'
    const tile = new Tile(data)
    tile.reveal()
    expect(tile.isRevealed).toBe(true)
  })

  test('conceal', () => {
    const data = 'Spiderman'
    const tile = new Tile(data)
    tile.reveal()
    tile.conceal()
    expect(tile.isRevealed).toBe(false)
  })

  test('toggle', () => {
    const data = 'Spiderman'
    const tile = new Tile(data, false)
    tile.toggle()
    expect(tile.isRevealed).toBe(true)
  })

  test('toString', () => {
    const tile = new Tile("A", false)
    expect(tile.toString()).toBe('?')
    tile.toggle()
    expect(tile.toString()).toBe(tile.id)
  })

})