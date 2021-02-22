const readline = require('readline');
import { Grid, Occupant } from "./grid"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const area = new Grid(10, 10)
let destroyer1 = new Occupant("destroyer1", 4)
let destroyer2 = new Occupant("destroyer2", 4)
let battleship1 = new Occupant("battleship1", 5)
area.populate(new Array(destroyer1, destroyer2, battleship1))

play(area)

function getCoords(input: string): Array<string> {
    return [input.slice(0,1), input.slice(1)]
}

function play(area: Grid) {
    rl.question("Enter Coordinates: ", (entered: string) => {
        const coords = getCoords(entered)
        const col = area.colRef.indexOf(coords[0].toUpperCase())
        const row = parseInt(coords[1])
        if(col !== -1 && row > 0 && row <= area.rowNum) {
            const target = area.getSquare(row-1, col)
            if(target.hit) {
                console.log("Already Fired Upon")
            } else {
                target.onHit()
                if(target.hasOccupant()) {
                    console.log("Hit!")
                    target.getOccupant().onHit()
                    if(target.getOccupant().isSunk()) {
                        console.log("Sunk!")
                    }
                } else console.log("Miss!")
            }
            if(!area.allSunk()) {
                play(area)        
            } else rl.close()
        } else {
            console.log("improper coordinates")
            play(area)
        }
    })

}


