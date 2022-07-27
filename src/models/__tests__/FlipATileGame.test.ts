import FlipATileGame from '../FlipATileGame'
import Board from '../Board'
import Tile from '../Tile'

describe('Test FlipATileGame class', () => {

  test('No mistakes', () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B', true)
    const board = new Board([tile1, tile2])
    const game = new FlipATileGame(board, 100)
    game.board.concealAll()
    game.play(0)
      .then(result => {
        expect(result).toBe('firstTileRevealed')
        return game.play(2)
      })
      .then(result => {
        expect(result).toBe('notAMatch')
        return game.play(1)
      })
      .then(result => {
        expect(result).toBe('firstTileRevealed')
        return game.play(0)
      })
      .then(result => {
        expect(result).toBe('match')
        return game.play(2)
      })
      .then(result => {
        expect(result).toBe('firstTileRevealed')
        return game.play(3)
      })
      .then(result => {
        expect(result).toBe('allTilesRevealed')
      })

    expect(game.mistakes).toEqual(0)
  })

  test('One mistake', async () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B', true)
    const board = new Board([tile1, tile2])
    const game = new FlipATileGame(board, 100)
    game.board.concealAll()
    await game.play(0)
    await game.play(2)

    await game.play(1)
    await game.play(3)

    await game.play(0)
    await game.play(1)

    await game.play(2)
    await game.play(3)
    expect(game.mistakes).toEqual(1)
  })

    test('Another mistake', async () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B', true)
    const tile3 = new Tile('C', true)
    const board = new Board([tile1, tile2, tile3])
    const game = new FlipATileGame(board, 100)
    game.board.concealAll()
    await game.play(0)
    await game.play(2)

    await game.play(4)
    await game.play(0)

    expect(game.mistakes).toEqual(1)
  })

})