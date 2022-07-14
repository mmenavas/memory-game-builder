import FlipATileGame from '../FlipATileGame'
import Board from '../Board'
import Tile from '../Tile'

jest.useFakeTimers();

describe('Test FlipATileGame class', () => {

  test('No mistakes', () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B', true)
    const board = new Board([tile1, tile2])
    const game = new FlipATileGame(board, 100)
    game.board.concealAll()
    game.play(0)
    game.play(1)

    // Fast-forward until all timers have been executed
    jest.runAllTimers();
    game.play(2)
    game.play(0)

    jest.runAllTimers();
    game.play(1)
    game.play(3)
    expect(game.mistakes).toEqual(0)
  })

  test('One mistake', () => {
    const tile1 = new Tile('A', true)
    const tile2 = new Tile('B', true)
    const board = new Board([tile1, tile2])
    const game = new FlipATileGame(board, 100)
    game.board.concealAll()
    game.play(0)
    game.play(1)

    jest.runAllTimers();
    game.play(2)
    game.play(3)

    jest.runAllTimers();
    game.play(0)
    game.play(2)

    jest.runAllTimers();
    game.play(1)
    game.play(3)
    expect(game.mistakes).toEqual(1)
  })

})