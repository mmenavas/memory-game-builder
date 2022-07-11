import Board from './Board'

/**
 * The implementation for a FlipATileGame.
 */
export default class FlipATileGame {
  board: Board<string>
  attempts = 0
  mismatches = 0
  mistakes = 0
  revealedTiles: number[] = []
  matches: number[] = []
  currentTurn: [number, number] = [-1, -1]
  gameOver = false

  /**
   * Constructor for FlipATileGame.
   * 
   * @param {Board} board A Board object containing tiles
   */
  constructor(board: Board<string>) {
    this.board = board
  }

  /**
   * Reset state to start a new game.
   */
  startGame():void {
    this.attempts = 0
    this.mistakes = 0
    this.revealedTiles = []
    this.currentTurn = [-1, -1]
    this.gameOver = false
    this.board.reset()
  }

  /**
   * Used for displaying the game information.
   * 
   * @returns {string} The state as a string.
   */
  toString():string {
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

  /**
   * Select a tile to reveal it.
   * 
   * @param {number} index The selected tile.
   * @returns {string} The resulting status of selecting a tile.
   */
  play(index: number): string {
    if (this.isGameOver()) {
      throw 'gameOverError'
    }

    if (this.board.isRevealedAt(index)) {
      throw 'tileAlreadyRevealedError'
    }

    this.board.revealAt(index)

    // Return if we're revealing the first tile of the current turn.
    if (this.currentTurn[0] === -1) {
      this.currentTurn[0] = index
      return 'firstTileRevealed'
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
      return 'notAMatch'
    }

    // Record match.
    this.matches.push(this.currentTurn[0])
    this.matches.push(this.currentTurn[1])
    this.currentTurn = [-1, -1]

    // Check if it's game over.
    if (this.isGameOver()) {
      this.gameOver = true
      return 'allTilesRevealed'
    }

    return 'match'

  }

  /**
   * Are the selected pair of tiles a match?
   * 
   * @returns {boolean} Whether or not selected pair of tiles is a match.
   */
  private isMatch(): boolean {
    return this.board.getAt(this.currentTurn[0]).value === this.board.getAt(this.currentTurn[1]).value
  }

  /**
   * Did the player revealed a card previously revealed and failed to make a match.
   * @returns {boolean} Whether or not the player made a mistake.
   */
  private isMistake(): boolean {
    if (this.isMatch()) {
      return false
    }

    const value = this.board.getAt(this.currentTurn[0]).value
    const matches = this.revealedTiles.filter((item) => {
      return this.board.getAt(item).value === value
    })

    return matches.length > 0
  }

  /**
   * Have all tiles been revealed?
   * 
   * @returns {boolean} Whether or not all tiles have been revealed.
   */
  private isGameOver(): boolean {
    return this.matches.length === this.board.getSize()
  }

  /**
   * Add selected pair to list of revealed tiles.
   */
  private addRevealedTiles(): void {
    this.addRevealedTile(this.currentTurn[0])
    this.addRevealedTile(this.currentTurn[1])
  }

  /**
   * Add tile to list of revealed tiles only if it hasn't been added already.
   * 
   * @param {number} index The tile position on the board.
   */
  private addRevealedTile(index: number): void {
    if (index < this.board.getSize() && !this.revealedTiles.includes(index)) {
      this.revealedTiles.push(index)
    }
  }

  /**
   * Conceal selected pair of tiles.
   */
  private concealTiles(): void {
    this.concealTile(this.currentTurn[0])
    this.concealTile(this.currentTurn[1])
  }

  /**
   * Conceal selected tile.
   * 
   * @param {number} index The position on the board.
   */
  private concealTile(index: number): void {
    if (index < this.board.getSize()) {
      this.board.concealAt(index)
    }
  }

  /**
   * Reset tile pair selection in preparation for a new selection.
   */
  private resetCurrentTurn(): void {
    this.currentTurn = [-1, -1]
  }
}