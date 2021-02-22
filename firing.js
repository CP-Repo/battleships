"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require('readline');
var grid_1 = require("./grid");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var area = new grid_1.Grid(10, 10);
var destroyer1 = new grid_1.Occupant("destroyer1", 4);
var destroyer2 = new grid_1.Occupant("destroyer2", 4);
var battleship1 = new grid_1.Occupant("battleship1", 5);
area.populate(new Array(destroyer1, destroyer2, battleship1));
console.log("Battleships");
console.log("Type 'quit' to exit");
play(area);
function getCoords(input) {
    return [input.slice(0, 1), input.slice(1)];
}
function printGrid(area) {
    console.log("~: Sea");
    console.log("X: Miss");
    console.log("S: Ship");
    console.log("*: Hit");
    var _loop_1 = function (i) {
        var outString = "|";
        area.getRow(i).forEach(function (square) {
            if (square.hasOccupant() && square.hit) {
                outString += "*|";
            }
            else if (square.hasOccupant() && !square.hit) {
                outString += "S|";
            }
            else if (!square.hasOccupant() && square.hit) {
                outString += "X|";
            }
            else
                outString += "~|";
        });
        console.log(outString);
    };
    for (var i = 0; i < area.rowNum; i++) {
        _loop_1(i);
    }
}
function play(area) {
    var coordRange = area.colRef[0] + "1" + "-" + area.colRef[area.colRef.length - 1] + area.rowNum;
    rl.question("Enter Coordinates within range " + coordRange + ": ", function (entered) {
        var coords = getCoords(entered);
        var col = area.colRef.indexOf(coords[0].toUpperCase());
        var row = parseInt(coords[1]);
        if (entered.toUpperCase() === "QUIT") {
            printGrid(area);
            rl.close();
        }
        else if (col !== -1 && row > 0 && row <= area.rowNum) {
            var target = area.getSquare(row - 1, col);
            if (target.hit) {
                console.log("Already Fired Upon");
            }
            else {
                target.onHit();
                if (target.hasOccupant()) {
                    console.log("Hit!");
                    target.getOccupant().onHit();
                    if (target.getOccupant().isSunk()) {
                        console.log("Sunk!");
                    }
                }
                else
                    console.log("Miss!");
            }
            if (!area.allSunk()) {
                play(area);
            }
            else {
                printGrid(area);
                rl.close();
            }
        }
        else {
            console.log("Improper Coordinates");
            play(area);
        }
    });
}
//# sourceMappingURL=firing.js.map