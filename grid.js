"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.occupant = exports.grid = exports.square = void 0;
var console_1 = require("console");
var square = /** @class */ (function () {
    function square(row, column) {
        this.hit = false;
        this.row = row;
        this.column = column;
    }
    square.prototype.getOccupant = function () {
        return this.occupant;
    };
    square.prototype.setOccupant = function (oc) {
        this.occupant = oc;
    };
    square.prototype.hasOccupant = function () {
        if (this.occupant)
            return true;
        else
            return false;
    };
    square.prototype.onHit = function () {
        this.hit = true;
    };
    return square;
}());
exports.square = square;
var grid = /** @class */ (function () {
    function grid(rows, columns) {
        this.squares = new Array();
        this.colRef = new Array();
        this.rowNum = rows;
        this.columnNum = columns;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                this.squares.push(new square(i, j));
            }
        }
        for (var i = 0; i < this.columnNum; i++) {
            this.colRef.push(String.fromCharCode(65 + i)); //65 is the unicode for A
        }
    }
    grid.prototype.getOccupiedSquares = function () {
        var occupiedSquares = new Array();
        this.squares.forEach(function (square) {
            if (square.hasOccupant()) {
                occupiedSquares.push(square);
            }
        });
        return occupiedSquares;
    };
    grid.prototype.getSquare = function (row, column) {
        var foundSquare = this.squares[row * this.columnNum + column];
        if (foundSquare === undefined) {
            throw console_1.exception("No square found");
        }
        else
            return foundSquare;
    };
    grid.prototype.populate = function (ships) {
        var _this = this;
        this.occupants = ships;
        ships.forEach(function (ship) {
            if (getRandomInt(2) == 1) {
                placeRow(ship, _this);
            }
            else {
                placeCol(ship, _this);
            }
        });
    };
    grid.prototype.allSunk = function () {
        var sunkFlag = true;
        this.occupants.forEach(function (ship) {
            if (!ship.isSunk())
                sunkFlag = false;
        });
        return sunkFlag;
    };
    return grid;
}());
exports.grid = grid;
var occupant = /** @class */ (function () {
    function occupant(name, size) {
        this.hits = 0;
        this.sunk = false;
        this.name = name;
        this.size = size;
    }
    occupant.prototype.onHit = function () {
        this.hits++;
        if (this.hits === this.size) {
            this.sunk = true;
        }
    };
    occupant.prototype.isSunk = function () {
        return this.sunk;
    };
    return occupant;
}());
exports.occupant = occupant;
function placeRow(ship, grid) {
    var row = getRandomInt(grid.rowNum);
    var start = getRandomInt(grid.columnNum - ship.size);
    var occupiedFlag = false;
    for (var i = start; i < start + ship.size; i++) {
        var coord = grid.getSquare(row, i);
        if (coord.hasOccupant()) {
            occupiedFlag = true;
            placeRow(ship, grid);
            break;
        }
    }
    if (!occupiedFlag) {
        for (var i = start; i < start + ship.size; i++) {
            grid.getSquare(row, i).setOccupant(ship);
        }
    }
}
function placeCol(ship, grid) {
    var col = getRandomInt(grid.columnNum);
    var start = getRandomInt(grid.rowNum - ship.size);
    var occupiedFlag = false;
    for (var i = start; i < start + ship.size; i++) {
        var coord = grid.getSquare(i, col);
        if (coord.hasOccupant()) {
            occupiedFlag = true;
            placeRow(ship, grid);
            break;
        }
    }
    if (!occupiedFlag) {
        for (var i = start; i < start + ship.size; i++) {
            grid.getSquare(i, col).setOccupant(ship);
        }
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//# sourceMappingURL=grid.js.map