import shuffle from 'lodash/fp/shuffle'
import cloneDeep from 'lodash/fp/cloneDeep'
import Tile from './Tile'

export default class FlipATileGame<Type> {

  tiles: Tile<Type>[] = []

  constructor(tiles: Tile<Type>[]) {
    const clonedTiles = cloneDeep(tiles)
    this.tiles = [...tiles, ...clonedTiles]
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

}