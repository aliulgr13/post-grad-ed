"use strict";
const chalk = require("chalk");
//creating tiles(28 tile)
function tilesGenerator() {
  const tiles = [];
  for (let i = 0; i <= 6; i++) {
    const tile = [i, i];
    tiles.push(tile);
    for (let a = i + 1; a <= 6; a++) {
      const tile = [i, a];
      tiles.push(tile);
    }
  }
  return tiles;
}
// getting random tile to shuffle it each player
function getRandomIndex(items) {
  return Math.floor(Math.random() * items.length);
}
//to show the tile as it is shown in the ta.
function toDisplayTile(arr, text) {
  const newarr = arr.map((el) => {
    return `<${el[0]}:${el[1]}> `;
  });
  console.log(`${text} ${newarr.join("")}`);
}
//shuffle tile randomly to each player
function shuffleTiles(tiles) {
  let firstUser = { tiles: [], name: "Klaus" };
  let secondUser = { tiles: [], name: "Marcel" };
  for (let i = 0; i < 7; i++) {
    let chosenTileForUserOne = tiles.splice(getRandomIndex(tiles), 1);
    firstUser.tiles.push(chosenTileForUserOne[0]);
    let chosenTileForUserTwo = tiles.splice(getRandomIndex(tiles), 1);
    secondUser.tiles.push(chosenTileForUserTwo[0]);
  }
  const board = tiles.splice(getRandomIndex(tiles), 1);
  toDisplayTile(board, "Game starting with first tyle:");
  return [firstUser, secondUser, board];
}
// to find whether we have proper tile to add gametile or not
function findValidTile(userArray, board) {
  let index = userArray.findIndex((userTile) => {
    return (
      userTile.includes(board[0][0]) ||
      userTile.includes(board[board.length - 1][1])
    );
  });
  return index;
}
// adding user's tile to the gametile
function addingTile(validTile, board) {
  let connectingTile;
  if (validTile[0] === board[0][0]) {
    connectingTile = board[0];
    let newValidTile = [...validTile];
    board.unshift(newValidTile.reverse());
  } else if (validTile[1] === board[0][0]) {
    connectingTile = board[0];
    board.unshift(validTile);
  } else if (validTile[0] === board[board.length - 1][1]) {
    connectingTile = board[board.length - 1];
    board.push(validTile);
  } else if (validTile[1] === board[board.length - 1][1]) {
    connectingTile = board[board.length - 1];
    let newValidTile = [...validTile];
    board.push(newValidTile.reverse());
  }
  return connectingTile;
}
// the process when each user playing their turn
function userSession(userArray, board, tiles) {
  let index = findValidTile(userArray.tiles, board);
  let validTile = userArray.tiles[index];
  while (validTile === undefined) {
    if (tiles.length > 0) {
      let chosenTile = tiles.splice(getRandomIndex(tiles), 1);
      userArray.tiles.push(chosenTile[0]);
      toDisplayTile(chosenTile, `${userArray.name} can't play, drawing tile`);
      index = findValidTile(userArray.tiles, board);
      validTile = userArray.tiles[index];
    } else {
      console.log(
        `${userArray.name} can't play and draw a tile, there is no tile in stock`
      );
      return;
    }
  }
  let connectingTile = addingTile(validTile, board);
  if (connectingTile) {
    console.log(
      `${userArray.name} plays <${validTile[0]}:${validTile[1]}> to connect to tile <${connectingTile[0]}:${connectingTile[1]}> on the board`
    );
  }
  userArray.tiles.splice(index, 1);
  toDisplayTile(board, "Board is now:");
  return validTile;
}
// after finishing game write winner to console
function determineWinner(arrayOne, arrayTwo) {
  if (arrayOne.length === 0) {
    console.log("Player One wins");
  } else if (arrayTwo.length === 0) {
    console.log("Player Two wins");
  } else if (arrayOne.length < arrayTwo.length) {
    console.log("Player One wins");
  } else if (arrayOne.length > arrayTwo.length) {
    console.log("Player Two wins");
  } else {
    console.log("Officially Draw");
  }
}
//play game by comparing users tiles
function playGame(firstUser, secondUser, board, tiles) {
  let validTileOne;
  let validTileTwo;
  while (firstUser.tiles.length !== 0 && secondUser.tiles.length !== 0) {
    validTileOne = userSession(firstUser, board, tiles);
    if (firstUser.tiles.length === 0) {
      break;
    }
    if (
      validTileOne === undefined &&
      validTileTwo === undefined &&
      tiles.length === 0
    ) {
      console.log("No one can play anymore");
      break;
    }
    validTileTwo = userSession(secondUser, board, tiles);
    if (validTileOne === undefined && validTileTwo === undefined) {
      console.log("No one can play anymore");
      break;
    }
    console.log("*******next round**********");
  }
  determineWinner(firstUser.tiles, secondUser.tiles);
}

const allTiles = tilesGenerator();
const [firstUser, secondUser, board] = shuffleTiles(allTiles);
playGame(firstUser, secondUser, board, allTiles);
