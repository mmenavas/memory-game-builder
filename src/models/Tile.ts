import uniqueId from 'lodash/fp/uniqueId'

export default class Tile<Type> {
  id: string
  data: Type
  isRevealed: boolean

  constructor(data: Type, isRevealed = false, id = '') {
    this.data = data
    this.isRevealed = isRevealed
    this.id = (id === '') ? uniqueId('tile_') : id
  }

  reveal() {
    this.isRevealed = true
  }

  conceal() {
    this.isRevealed = false
  }

  toggle() {
    this.isRevealed = !this.isRevealed
  }

  toString() {
    if (!this.isRevealed) {
      return "?"
    }
    return this.id
  }

} 