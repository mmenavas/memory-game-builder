import shuffle from 'lodash/fp/shuffle'
import cloneDeep from 'lodash/fp/cloneDeep'
import Tile from './Tile'


export default class FlipATileGame {
  tiles: Tile<string>[] = []
  attempts = 0
  mistakes = 0
  isGameOver = false

  constructor(tiles: Tile<string>[]) {
    const clonedTiles= cloneDeep(tiles)
    this.tiles = [...tiles, ...clonedTiles]
  }

  /**
   * Start a new game.
   */
  startGame() {
    this.attempts = 0
    this.mistakes = 0
    this.isGameOver = false
    this.concealAll()
    this.shuffle()

    return this.tiles
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

  toString() {
    let output = ''
    for (let i = 0; i < this.tiles.length; i++) {
      output = output + this.tiles[i].value
      if (i < this.tiles.length - 1) {
        output = output + '||'
      }
    }
    return output
  }

  // /**
  //  * A player gets to flip two cards. This function returns information
  //  * about what happens when a card is selected
  //  *
  //  * @param {number} Index of card selected by player
  //  * @return {object} {code: number, message: string, args: array or number}
  //  */
  // play: (function() {
  //   var cardSelection = [];
  //   var revealedCards = 0;
  //   var revealedValues = [];

  //   return function(index) {
  //     var status = {};
  //     var value = this.cards[index].value;

  //     if (!this.cards[index].isRevealed) {
  //       this.cards[index].reveal();
  //       cardSelection.push(index);
  //       if (cardSelection.length == 2) {
  //         this.attempts++;
  //         if (this.cards[cardSelection[0]].value !=
  //             this.cards[cardSelection[1]].value) {
  //           // No match
  //           this.cards[cardSelection[0]].conceal();
  //           this.cards[cardSelection[1]].conceal();
  //           /**
  //            * Algorithm to determine a mistake.
  //            * Check if the pair of at least
  //            * one card has been revealed before
  //            *
  //            * indexOf return -1 if value is not found
  //            */
  //           var isMistake = false;

  //           if (revealedValues.indexOf(this.cards[cardSelection[0]].value) === -1) {
  //             revealedValues.push(this.cards[cardSelection[0]].value);
  //           }
  //           else {
  //             isMistake = true;
  //           }

  //           if (revealedValues.indexOf(this.cards[cardSelection[1]].value) === -1) {
  //             revealedValues.push(this.cards[cardSelection[1]].value);
  //           }

  //           if (isMistake) {
  //             this.mistakes++;
  //           }

  //           revealedValues.push(this.cards[cardSelection[0]].value);

  //           status.code = 3,
  //           status.message = 'No Match. Conceal cards.';
  //           status.args = cardSelection;
  //         }
  //         else {
  //           revealedCards += 2;
  //           if (revealedCards == this.cards.length) {
  //             // Game over
  //             this.isGameOver = true;
  //             revealedCards = 0;
  //             revealedValues = [];
  //             status.code = 4,
  //             status.message = 'GAME OVER! Attempts: ' + this.attempts +
  //                 ', Mistakes: ' + this.mistakes;
  //           }
  //           else {
  //             status.code = 2,
  //             status.message = 'Match.';
  //           }
  //         }
  //         cardSelection = [];
  //       }
  //       else {
  //         status.code = 1,
  //         status.message = 'Flip first card.';
  //       }
  //     }
  //     else {
  //       status.code = 0,
  //       status.message = 'Card is already facing up.';
  //     }

  //     return status;

  //   };
  // })()
}