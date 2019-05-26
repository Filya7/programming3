// gishatich
let LiveForm = require("./liveForm")
module.exports = class Predator extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 10;
        this.multiply = 0;
    }
    //move() շարժվել
    move() {
        var fundCords = this.getDirections(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];
        this.energy --
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }

    //eat()-ուտել
    eat() {
        var fundCords = this.getDirections(2);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

            this.multiply++;
            this.energy += 2;

            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }


            if (this.multiply == 20) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    mul() {
        var fundCords = this.getDirections(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            var norPredator = new Predator(x, y);
            predatorArr.push(norPredator);
            matrix[y][x] = 2;
        }
    }

    //die() մահանալ
    die() {

        matrix[this.y][this.x] = 0;

        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
    }
}
