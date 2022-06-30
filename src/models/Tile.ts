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

} 