import cloneDeep from 'lodash/fp/cloneDeep'
import Tile from './Tile'

/**
 * Matching tiles are 2 tiles that have the same id.
 */
export default class MatchingTiles<Type> {
  tiles: [Tile<Type>, Tile<Type>]

  constructor(tile1: Tile<Type>, tile2?: Tile<Type>) {
    const newTile: Tile<Type> = (typeof tile2 !== 'undefined') ? MatchingTiles.createMatchingTile(tile1, tile2.data) : MatchingTiles.clone(tile1)
    this.tiles = [tile1, newTile]
  }

  toArray() {
    return [this.tiles[0], this.tiles[1]]
  }

  toString() {
    return this.tiles[0].toString() + '||' + this.tiles[1].toString()
  }

  static same<Type>(tile1: Tile<Type>, tile2: Tile<Type>): boolean {
    return tile1.id === tile2.id
  }

  static clone<Type>(tile: Tile<Type>): Tile<Type> {
    return new Tile<Type>(cloneDeep(tile.data), tile.isRevealed, tile.id )
  }

  static createMatchingTile<Type>(tile: Tile<Type>, data: Type) {
    const newTile = MatchingTiles.clone(tile)
    newTile.data = data
    return newTile
  }

} 