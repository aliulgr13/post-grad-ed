"use strict";
const chalk = require("chalk");
//defining global variables
const tiles = [];
let firstUserTiles = [];
let secondUserTiles = [];
let i;
//first chosen tile to start game, this array is also our gameTile.
let randomTileToStart;
//creating tiles(28 tile)
function tilesGenerator() {
  for (let i = 0; i <= 6; i++) {
    const tile = [];
    tile.push(i, i);
    tiles.push(tile);
    for (let a = i + 1; a <= 6; a++) {
      const tile = [];
      tile.push(i, a);
      tiles.push(tile);
    }
  }
  console.log("tiles", tiles);
  console.log(tiles.length);
}
// getting random tile to shuffle it each player
function getRandomIndex(items) {
  return Math.floor(Math.random() * items.length);
}
//shuffle tile randomly to each player
function shuffleTiles() {
  for (let i = 0; i < 7; i++) {
    let chosenTileForUserOne = tiles.splice(getRandomIndex(tiles), 1);
    firstUserTiles.push(chosenTileForUserOne[0]);
    let chosenTileForUserTwo = tiles.splice(getRandomIndex(tiles), 1);
    secondUserTiles.push(chosenTileForUserTwo[0]);
  }
  console.log("firstuser", firstUserTiles);
  console.log("seconduser", secondUserTiles);
  console.log("tileslength", tiles.length);
  randomTileToStart = tiles.splice(getRandomIndex(tiles), 1);
  console.log("gameTile", randomTileToStart);
}
// to find whether we have proper tile to add gametile or not
function findValidTile(userArray) {
  let validTile = userArray.find((userTile, index) => {
    if (
      userTile.includes(randomTileToStart[0][0]) ||
      userTile.includes(randomTileToStart[randomTileToStart.length - 1][1])
    ) {
      // defining 'i' variale to be able to remove tile from usertiles(userarray)
      i = index;
      return userTile;
    }
  });
  console.log(chalk.greenBright("validTile"), validTile);
  return validTile;
}
// adding user's tile to the gametile
function addingTile(validTile) {
  if (validTile[0] === randomTileToStart[0][0]) {
    randomTileToStart.unshift(validTile.reverse());
  } else if (validTile[1] === randomTileToStart[0][0]) {
    randomTileToStart.unshift(validTile);
  } else if (
    validTile[0] === randomTileToStart[randomTileToStart.length - 1][1]
  ) {
    randomTileToStart.push(validTile);
  } else if (
    validTile[1] === randomTileToStart[randomTileToStart.length - 1][1]
  ) {
    randomTileToStart.push(validTile.reverse());
  }
}
// the process when each user playing their turn
function userSession(userArray) {
  let validTile = findValidTile(userArray);
  while (validTile === undefined) {
    if (tiles.length > 0) {
      let chosenTile = tiles.splice(getRandomIndex(tiles), 1);
      userArray.push(chosenTile[0]);
      validTile = findValidTile(userArray);
    } else {
      console.log("there is no tile in stock");
      return validTile;
    }
  }
  addingTile(validTile);
  userArray.splice(i, 1);
  console.log(chalk.red("last phase userArray"), userArray);
  console.log(chalk.cyan("gameTile"), randomTileToStart);
  console.log("tileslength", tiles.length);
  console.log("*****************");
  return validTile;
}
// after finishing game write winner to console
function determineWinner(arrayOne, arrayTwo) {
  if (arrayOne.length === 0) {
    console.log("playerone wins");
  } else if (arrayTwo.length === 0) {
    console.log("playertwo wins");
  } else if (arrayOne.length < arrayTwo.length) {
    console.log("playerone wins");
  } else if (arrayOne.length > arrayTwo.length) {
    console.log("playertwo wins");
  } else {
    console.log("officially draw");
  }
}
//comparing userssession
function compareArrays(arrayOne, arrayTwo) {
  while (arrayOne.length !== 0 && arrayTwo.length !== 0) {
    console.log("arrayOne", arrayOne.length);
    console.log("arrayTwo", arrayTwo.length);
    let validTileOne = userSession(arrayOne);
    if (arrayOne.length === 0) {
      determineWinner(arrayOne, arrayTwo);
      return;
    }
    let validTileTwo = userSession(arrayTwo);
    if (validTileOne === undefined && validTileTwo === undefined) {
      console.log("No one can play anymore");
      determineWinner(arrayOne, arrayTwo);
      return;
    }
  }
  determineWinner(arrayOne, arrayTwo);
}

tilesGenerator();
shuffleTiles();
compareArrays(firstUserTiles, secondUserTiles, tiles);
