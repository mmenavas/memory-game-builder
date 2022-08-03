## Memory Game Builder
Memory Game Builder is an engine for creating memory games and quizzes.
As of the `1.0.0` release, this library only ships a flip-a-tile
game, but more games are on the roadmap.

This library provides the logic for building memory games and can be used
to hold the state (e.g. track revealed tiles and mistakes count); however,
it is not bundled with any graphical interfaces. A react component for
creating flip-a-tile games, that is based on this library, is available on
https://github.com/mmenavas/memory-game-react/. A live memory game that
uses this library is available on https://marvelous.iammaximo.com/.

### Installation
Install this library using NPM by running
```
npm install @mmenavas/memory-game-builder
```

Once the library is installed you can create a flip-a-tile game by
following the code sample below:

```
import { Tile, Board, FlipATileGame } from @mmenavas/memory-game-builder

// Create the tiles for the board.
const tile1 = new Tile('A')
const tile2 = new Tile('B')
const tile3 = new Tile('C')

// Create the board with the above tiles and
// clone the supplied tiles to generate matching
// pairs.
const board = new Board([tile1, tile2, tile3])

// Create the game with the above board, and
// pass 500 miliseconds to configure how long
// the selected tiles should remain revealed
// on a mismatch. 
const game = new FlipATileGame(board, 500)

// Reset counters and shuffle tiles.
game.start()
game.play(0)
  .then(result => {
    console.log(result) // should return 'firstTileRevealed'
    console.log(game.toString()) // should print out the board and other info.
    return game.play(1)
  })
  .then(result => {
    console.log(result) // can return 'match' or 'notAMatch'
    console.log(game.toString()) // should print out the board and other info.
  })
```

I'd like to encourage you to look at the source code and tests to
learn more about how to use this library.

### Roadmap
I believe any game that involves shuffling and guessing could be implemented using
the basic blocks provided by this library. I plan to add the games below:
- ~Flip-a-tile~ (implemented)
- Flash cards
- Quizz