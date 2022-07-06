import Board from './Board'

export default class FlipATileGame {
  board: Board<string>
  attempts = 0
  mismatches = 0
  mistakes = 0
  revealedTiles: number[] = []
  matches: number[] = []
  currentTurn: [number, number] = [-1, -1]
  gameOver = false

  constructor(board: Board<string>) {
    this.board = board
  }

  startGame() {
    this.attempts = 0
    this.mistakes = 0
    this.revealedTiles = []
    this.currentTurn = [-1, -1]
    this.gameOver = false
    this.board.reset()
  }

  toString() {
    return `
      Attempts: ${this.attempts}
      Mismatches: ${this.mismatches}
      Mistakes: ${this.mistakes}
      Revealed: ${this.revealedTiles}
      Matches:  ${this.matches}
      Current Turn:  ${this.currentTurn}
      Game Over:  ${this.gameOver}
      Board: ${this.board.toString()}
    `
  }

  play(index: number) {
    if (this.isGameOver()) {
      throw 'Game is over'
    }

    if (this.board.isRevealedAt(index)) {
      throw 'Tile is already revealed'
    }

    this.board.revealAt(index)

    // Return if we're revealing the first tile of the current turn.
    if (this.currentTurn[0] === -1) {
      this.currentTurn[0] = index
      return
    }

    this.currentTurn[1] = index
    this.attempts++

    if (!this.isMatch()) {
      this.mismatches++
      if (this.isMistake()) {
        this.mistakes++
      }
      this.addRevealedTiles()
      this.concealTiles()
      this.resetCurrentTurn()
      return
    }

    // Record match.
    this.matches.push(this.currentTurn[0])
    this.matches.push(this.currentTurn[1])
    this.currentTurn = [-1, -1]

    // Check if it's game over.
    if (this.isGameOver()) {
      this.gameOver = true
    }
  }

  isMatch(): boolean {
    return this.board.getAt(this.currentTurn[0]).value === this.board.getAt(this.currentTurn[1]).value
  }

  isMistake(): boolean {
    if (this.isMatch()) {
      return false
    }

    const value = this.board.getAt(this.currentTurn[0]).value
    const matches = this.revealedTiles.filter((item) => {
      return this.board.getAt(item).value === value
    })

    return matches.length > 0
  }

  isGameOver(): boolean {
    return this.matches.length === this.board.getSize()
  }

  addRevealedTiles() {
    this.addRevealedTile(this.currentTurn[0])
    this.addRevealedTile(this.currentTurn[1])
  }

  addRevealedTile(index: number) {
    if (index < this.board.getSize() && !this.revealedTiles.includes(index)) {
      this.revealedTiles.push(index)
    }
  }

  concealTiles() {
    this.concealTile(this.currentTurn[0])
    this.concealTile(this.currentTurn[1])
  }

  concealTile(index: number) {
    if (index < this.board.getSize()) {
      this.board.concealAt(index)
    }
  }

  resetCurrentTurn() {
    this.currentTurn = [-1, -1]
  }
}