import Tile from '../Tile'
import MatchingTiles from '../MatchingTiles'
import Board from '../Board'

describe('Test Board class', () => {

  test('constructor with cloning', () => {
    const tile1 = new Tile('A')
    const tile2 = new Tile('B')
    const board = new Board([tile1, tile2])
    expect(board.tiles).toEqual([tile1, tile1, tile2, tile2])
  })

  test('constructor without cloning', () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B', true)
    const pair1 = new MatchingTiles(tile1)
    const pair2 = new MatchingTiles(tile2)
    const board = new Board([...pair1.toArray(), ...pair2.toArray()], false)
    expect(board.tiles).toEqual([tile1, tile1, tile2, tile2])
  })

  test('constructor throws error', () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B', true)
    const tile3 = new Tile('C', true)
    const pair1 = new MatchingTiles(tile1)
    expect(() => {new Board([tile1], false)}).toThrow('Number of tiles must be greater than 2.')
    expect(() => {new Board([tile1, tile2, tile3], false)}).toThrow('Number of tiles must be even.')
    expect(() => {new Board([...pair1.toArray(), tile2, tile3], false)}).toThrow('All tiles should have a tile with a matching id.')

  })

  test('getAt', () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B', true)
    const board = new Board([tile1, tile2])
    expect(board.getAt(0).toString()).toEqual(tile1.id)
    expect(board.getAt(1).toString()).toEqual(tile1.id)
    expect(board.getAt(2).toString()).toEqual(tile2.id)
    expect(board.getAt(3).toString()).toEqual(tile2.id)
  })

  test('concealAll', () => {
    const tile1 = new Tile('A')
    const tile2 = new Tile('B')
    tile1.reveal()
    const board = new Board([tile1, tile2])
    expect(board.tiles[0].isRevealed).toEqual(true)
    expect(board.tiles[1].isRevealed).toEqual(true)
    expect(board.tiles[2].isRevealed).toEqual(false)
    expect(board.tiles[3].isRevealed).toEqual(false)
    board.concealAll()
    expect(board.tiles[0].isRevealed).toEqual(false)
    expect(board.tiles[1].isRevealed).toEqual(false)
    expect(board.tiles[2].isRevealed).toEqual(false)
    expect(board.tiles[3].isRevealed).toEqual(false)
  })

  test('shuffle', () => {
    const tile1 = new Tile('A')
    const tile2 = new Tile('B')
    const tile3 = new Tile('C')
    const board = new Board([tile1, tile2, tile3])
    board.shuffle()
    expect((board.toString().split('|') || []).length).toEqual(6)
  })

  test('toString', () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B')
    const tile3 = new Tile('C', true)
    const board = new Board([tile1, tile2, tile3])
    expect(board.toString()).toEqual(`${tile1.id}|${tile1.id}|?|?|${tile3.id}|${tile3.id}`)
  })

})