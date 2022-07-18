import shuffle from 'lodash/fp/shuffle'
import cloneDeep from 'lodash/fp/cloneDeep'
import Tile from './Tile'
import MatchingTiles from './MatchingTiles'

export default class Board<Type> {

  tiles: Tile<Type>[] = []

  constructor(tiles: Tile<Type>[], clone = true) {
    if (clone) {
      const tileTuples = tiles.map(tile => new MatchingTiles<Type>(tile).tiles)
      this.tiles = tileTuples.reduce(((acc: Tile<Type>[], tuple) => [...acc, tuple[0], tuple[1]]), [])
    }
    else {
      this.validateTiles(tiles)
      this.tiles = tiles
    }
  }

  getSize() {
    return this.tiles.length
  }

  getAt(index:number): Tile<Type> {
    if (index > this.tiles.length) {
      throw 'Array index cannot be greater than array length'
    }
    return this.tiles[index]
  }

  isRevealedAt(index:number): boolean {
    return this.getAt(index).isRevealed
  }

  revealAt(index:number) {
    this.getAt(index).reveal()
  }

  concealAt(index:number) {
    this.getAt(index).conceal()
  }

  revealAll() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].reveal()
    }
  }

  concealAll() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].conceal()
    }
  }

  shuffle() {
    const clonedTiles = cloneDeep(this.tiles)
    this.tiles = shuffle(clonedTiles)
  }

  reset() {
    this.concealAll()
    this.shuffle()
  }

  toString() {
    let output = ''
    for (let i = 0; i < this.tiles.length; i++) {
      output = output + this.tiles[i].toString()
      if (i < this.tiles.length - 1) {
        output = output + '|'
      }
    }
    return output
  }

  validateTiles(tiles: Tile<Type>[]) {
    if (tiles.length < 2) {
      throw('Number of tiles must be greater than 2.')

    }
    if ((tiles.length % 2) !== 0) {
      throw('Number of tiles must be even.')
    }
    const idCounter = tiles.reduce((acc: Map<string, number>, tile:Tile<Type>) => {
      if (acc.has(tile.id)) {
        return acc.set(tile.id, acc.get(tile.id)! + 1)
      }
      return acc.set(tile.id, 1)
    }, new Map<string, number>())

    const oddCounts = [...idCounter.values()].filter(item => (item % 2) !== 0)
    if (oddCounts.length > 0) {
      throw('All tiles should have a tile with a matching id.')   
    }
  }

}