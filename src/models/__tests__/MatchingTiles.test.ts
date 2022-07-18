import MatchingTiles from '../MatchingTiles'
import Tile from '../Tile'

describe('Test MatchingTiles class', () => {

  test('constructor with only 1 argument', () => {
    const data = {
      name: 'hulk',
      image: 'https://exmple.com/hulk.jpg'
    }
    const tile = new Tile(data)
    const matchingTiles = new MatchingTiles(tile)
    expect(matchingTiles.tiles[0].id).toBe(matchingTiles.tiles[1].id)
  })

  test('constructor with 2 argument', () => {
    const data1 = {
      name: 'hulk',
      image: 'https://exmple.com/hulk.jpg'
    }
    const data2 = {
      name: 'hulk2',
      image: 'https://exmple.com/hulk2.jpg'
    }
    const tile1 = new Tile(data1)
    const tile2 = new Tile(data2)
    expect(tile2.id).not.toBe(tile1.id)
    const matchingTiles = new MatchingTiles(tile1, tile2)
    expect(matchingTiles.tiles[0].id).toBe(matchingTiles.tiles[1].id)
  })

  test('toArray()', () => {
    const tile = new Tile('A')
    const matchingTiles = new MatchingTiles(tile)
    expect(matchingTiles.toArray().length).toEqual(2)
  })
})