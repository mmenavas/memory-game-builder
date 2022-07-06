export default class Tile<Type> {
  value: Type
  isRevealed: boolean

  constructor(value: Type, isRevealed = false) {
    this.value = value
    this.isRevealed = isRevealed
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
    if (typeof this.value === 'string' ||
      typeof this.value === 'number') {
      return this.value.toString()
    }
    return JSON.stringify(this.value)
  }

} 