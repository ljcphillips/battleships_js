
function BattleshipGrid (noRows,noColumns) {
  this.grid
  this.create(noRows,noColumns)
};

BattleshipGrid.prototype.create = function(width, height){
  grid = [];
  row = [];
  for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
          row.push("*");
      }
      grid.push(row);
      row = [];
  }
  this.grid = grid
  return this.grid;
};

BattleshipGrid.prototype.print = function(grid){
  for (var i = 0; i < grid.length; i++) {
      console.log(grid[i].join(""));
  }
};

BattleshipGrid.prototype.shipDirection = function(){
  var direction = "unknown"
  if (Math.random() > 0.5){
    direction = "vertical"
  }
  else{direction = "horizontal"}
  return direction;
};

BattleshipGrid.prototype.selectCoordinates = function(shipSize){
  if (this.shipDirection() === "vertical"){
    row = Math.floor(Math.random()*(this.grid.length-shipSize+1))
    column = Math.floor(Math.random()*this.grid[0].length)
    coordinates = ["vertical",row,column,shipSize]
    return coordinates
  }
  else {
    row = Math.floor(Math.random()*this.grid.length)
    column = Math.floor(Math.random()*(this.grid[0].length-shipSize+1))
    coordinates = ["horizontal",row,column,shipSize]
    return coordinates
  }
}

BattleshipGrid.prototype.isEmptySpace = function(coordinates){
    direction = coordinates[0]
    row = coordinates[1]
    column = coordinates[2]
    shipSize = coordinates[3]
    array = []
    if (direction === "vertical"){
      for (var i = 0; i < shipSize; i++){
        if (this.grid[row + i][column]== '*'){
          array.push(true)
        }
        else{
          array.push(false)
        }
      }
    }
    else{
      for (var i = 0; i < shipSize; i++){
        if(this.grid[row][column + i] == '*'){
          array.push(true)
        }
        else{
          array.push(false)
        }
      }
    }
    if (array.includes(false)){
      return false
    }
    else{
      return true
    }
  }

BattleshipGrid.prototype.placeShip = function(shipSize){
  coordinates = this.selectCoordinates(shipSize)
  // console.log(coordinates)
  // console.log(this.isEmptySpace(coordinates))
  while (this.isEmptySpace(coordinates)===false){
    coordinates = this.selectCoordinates(shipSize)
    // console.log(coordinates)
    // console.log(this.isEmptySpace(coordinates))
  }
  direction = coordinates[0]
  row = coordinates[1]
  column = coordinates[2]
  shipSize = coordinates[3]
  if (direction === "vertical"){
    for (var i = 0; i < shipSize; i++){
    this.grid[row + i][column]= shipSize
    }
  }
  else {
    for (var i = 0; i < shipSize; i++){
    this.grid[row][column + i]= shipSize
    }
  }
};

BattleshipGrid.prototype.aim = function(){
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var takeAim = function() {
    rl.question('Enter:', (answer) => {
        if (missedShots >= 5 || successfulShots >=21){
          console.log("GAME OVER")
          return rl.close();
        }
      // console.log(`You've picked: ${answer}`);
      row = answer[0]
      column = answer[1]
      console.log(row)
      // console.log(column)
      // console.log(hiddengrid)
        if (hiddengrid[row][column] !== "*"){
          console.log("you hit a ship")
          visiblegrid[row][column] = hiddengrid[row][column]
          bsg.print(visiblegrid)
          successfulShots += 1
          console.log(successfulShots)
        }
        else {
          console.log("you missed")
          visiblegrid[row][column] = "X"
          bsg.print(visiblegrid)
          missedShots += 1
          console.log(missedShots)
        }
      takeAim();
    });
  };
  takeAim();
};


module.exports = BattleshipGrid;
