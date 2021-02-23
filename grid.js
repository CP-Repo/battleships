"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Occupant = exports.Grid = exports.Square = void 0;
var console_1 = require("console");
var Square = /** @class */ (function () {
    function Square(row, column) {
        this.hit = false;
        this.row = row;
        this.column = column;
    }
    Square.prototype.getOccupant = function () {
        return this.occupant;
    };
    Square.prototype.setOccupant = function (oc) {
        this.occupant = oc;
    };
    Square.prototype.hasOccupant = function () {
        if (this.occupant)
            return true;
        else
            return false;
    };
    Square.prototype.onHit = function () {
        this.hit = true;
    };
    return Square;
}());
exports.Square = Square;
var Grid = /** @class */ (function () {
    function Grid(rows, columns) {
        /**
         * Defines the play area.
         */
        this.squares = new Array();
        this.colRef = new Array();
        this.rowNum = rows;
        this.columnNum = columns;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                this.squares.push(new Square(i, j));
            }
        }
        for (var i = 0; i < this.columnNum; i++) {
            /**
             * Constructs the column references based upon the size of the grid.
             * 65 is the unicode for A.
             */
            this.colRef.push(String.fromCharCode(65 + i));
        }
    }
    Grid.prototype.getOccupiedSquares = function () {
        var occupiedSquares = new Array();
        this.squares.forEach(function (square) {
            if (square.hasOccupant()) {
                occupiedSquares.push(square);
            }
        });
        return occupiedSquares;
    };
    Grid.prototype.getRow = function (row) {
        var squares = new Array();
        for (var i = 0; i < this.columnNum; i++) {
            squares.push(this.getSquare(row, i));
        }
        return squares;
    };
    Grid.prototype.getSquare = function (row, column) {
        var foundSquare = this.squares[row * this.columnNum + column];
        /**
         * Whilst wraparound could happen if a column provided is larger than the number of columns, earlier logic on the input prevents this.
         */
        if (foundSquare === undefined) {
            throw console_1.exception("No square found");
        }
        else
            return foundSquare;
    };
    Grid.prototype.populate = function (ships) {
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
    Grid.prototype.allSunk = function () {
        var sunkFlag = true;
        this.occupants.forEach(function (ship) {
            if (!ship.isSunk())
                sunkFlag = false;
        });
        return sunkFlag;
    };
    return Grid;
}());
exports.Grid = Grid;
var Occupant = /** @class */ (function () {
    function Occupant(name, size) {
        this.hits = 0;
        this.sunk = false;
        this.name = name;
        this.size = size;
    }
    Occupant.prototype.onHit = function () {
        this.hits++;
        if (this.hits === this.size) {
            this.sunk = true;
        }
    };
    Occupant.prototype.isSunk = function () {
        return this.sunk;
    };
    return Occupant;
}());
exports.Occupant = Occupant;
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
/**
 * Random int is not inclusive of max.
 * The random integer i will be in the range 0 <= i < max.
 *
 *  */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//# sourceMappingURL=grid.js.map