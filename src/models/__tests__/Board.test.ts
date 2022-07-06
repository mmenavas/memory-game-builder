import Tile from '../Tile'
import Board from '../Board'

describe('Test Board class', () => {

  test('constructor', () => {
    const tile1 = new Tile('A')
    const tile2 = new Tile('B')
    const board = new Board([tile1, tile2])
    expect(board.tiles).toEqual([tile1, tile2, tile1, tile2])
  })

  test('getAt', () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B', true)
    const board = new Board([tile1, tile2])
    expect(board.getAt(0).toString()).toEqual('A')
    expect(board.getAt(1).toString()).toEqual('B')
    expect(board.getAt(2).toString()).toEqual('A')
    expect(board.getAt(3).toString()).toEqual('B')
  })

  test('concealAll', () => {
    const tile1 = new Tile('A')
    const tile2 = new Tile('B')
    tile1.reveal()
    const board = new Board([tile1, tile2])
    expect(board.tiles[0].isRevealed).toEqual(true)
    expect(board.tiles[1].isRevealed).toEqual(false)
    expect(board.tiles[2].isRevealed).toEqual(true)
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
    const board = new Board([tile1, tile2])
    expect(board.toString()).toEqual('A|?|A|?')
  })

})