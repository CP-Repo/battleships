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
play(area);
function getCoords(input) {
    return [input.slice(0, 1), input.slice(1)];
}
function play(area) {
    rl.question("Enter Coordinates: ", function (entered) {
        var coords = getCoords(entered);
        var col = area.colRef.indexOf(coords[0].toUpperCase());
        var row = parseInt(coords[1]);
        if (col !== -1 && row > 0 && row <= area.rowNum) {
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
            else
                rl.close();
        }
        else {
            console.log("improper coordinates");
            play(area);
        }
    });
}
//# sourceMappingURL=firing.js.map