import { exception } from "console";

export class Square {
    occupant?: Occupant;
    hit: boolean = false;
    row: number;
    column: number;

    constructor(row: number, column: number) {
        this.row = row
        this.column = column
    }

    getOccupant(): Occupant {
        return this.occupant
    }

    setOccupant(oc: Occupant): void {
        this.occupant = oc
    }

    hasOccupant(): boolean {
        if(this.occupant) return true
        else return false
    }

    onHit(): void {
        this.hit = true
    }
}

export class Grid {
    squares: Array<Square> = new Array();
    occupants: Array<Occupant>
    rowNum: number;
    columnNum: number;
    colRef: Array<string> = new Array()

    constructor(rows: number, columns: number) {
        this.rowNum = rows
        this.columnNum = columns
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                this.squares.push(new Square(i,j))
            }
        }
        for(let i = 0; i < this.columnNum; i++) {
            this.colRef.push(String.fromCharCode(65+i)) //65 is the unicode for A
        }
    }

    getOccupiedSquares(): Array<Square> {
        let occupiedSquares = new Array()
        this.squares.forEach(square => {
            if(square.hasOccupant()){
                occupiedSquares.push(square)
            }
        })
        return occupiedSquares
    }

    getSquare(row: number, column: number): Square {
        let foundSquare = this.squares[row*this.columnNum + column] //whilst wraparound could happen if a column provideed is larger thn the number of columns, earlier logic on the input prevents this
        if(foundSquare === undefined) {
            throw exception("No square found")
        } else return foundSquare
    }

    populate(ships: Array<Occupant>): void {
        this.occupants = ships
        ships.forEach(ship => {
            if(getRandomInt(2) == 1) {
                placeRow(ship, this)
            } else {
                placeCol(ship, this)
            }
        })
    }

    allSunk(): boolean {
        let sunkFlag = true
        this.occupants.forEach( ship => {
            if(!ship.isSunk()) sunkFlag = false
        })
        return sunkFlag
    }
}

export class Occupant {
    name: string
    size: number;
    hits: number = 0;
    sunk: boolean = false;

    constructor(name: string, size: number) {
        this.name = name
        this.size = size
    }

    onHit(): void {
        this.hits ++
        if(this.hits === this.size) {
            this.sunk = true
        }
    }

    isSunk(): boolean {
        return this.sunk
    }
    
}

function placeRow(ship: Occupant, grid: Grid): void {
    const row = getRandomInt(grid.rowNum)
    const start = getRandomInt(grid.columnNum-ship.size)
    let occupiedFlag = false
    for(let i = start; i < start+ship.size; i++) {
        const coord = grid.getSquare(row,i)
        if(coord.hasOccupant()) {
            occupiedFlag = true
            placeRow(ship, grid)
            break
        }
    }
    if(!occupiedFlag) {
        for(let i = start; i < start+ship.size; i++) {
            grid.getSquare(row,i).setOccupant(ship)
        }
    }
}

function placeCol(ship: Occupant, grid: Grid): void {
    const col = getRandomInt(grid.columnNum)
    const start = getRandomInt(grid.rowNum-ship.size)
    let occupiedFlag = false
    for(let i = start; i < start+ship.size; i++) {
        const coord = grid.getSquare(i, col)
        if(coord.hasOccupant()) {
            occupiedFlag = true
            placeRow(ship, grid)
            break
        }
    }
    if(!occupiedFlag) {
        for(let i = start; i < start+ship.size; i++) {
            grid.getSquare(i, col).setOccupant(ship)
        }
    }
}

function getRandomInt(max: number): number { // random int is not inclusive of max
    return Math.floor(Math.random() * Math.floor(max))
}
