// var prompt = require('prompt');
const readline = require('readline');
var battleshipGrid = require("./battleshipGrid.js");
module.exports = {
  battleshipGrid: battleshipGrid
}



console.log("Welcome to Battleship")
console.log("Take your aim")
bsg = new battleshipGrid(5,6);
bsg.placeShip(5)
bsg.placeShip(4)
bsg.placeShip(3)
bsg.placeShip(3)
bsg.placeShip(2)
bsg.placeShip(2)
bsg.placeShip(1)
bsg.placeShip(1)
hiddengrid = bsg.grid
visiblegrid = bsg.create(5,6)
missedShots = 0
successfulShots = 0
bsg.aim()

// while (missedShots + successfulShots <= 30){

// }
