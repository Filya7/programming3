let LiveForm = require("./liveForm")
let Eatgrass = require("./grasseater")
// kerpar 2
module.exports = class Eaterpredator extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 30;
        this.multiply = 10;
    }

    //move() շարժվել
    move() {
        var fundCords1 = this.getDirections(0);
        var fundCords = this.getDirections(1);
        fundCords = fundCords.concat(fundCords1)
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }

    //eat()-ուտել
    eat() {
        var fundCords = this.getDirections(2);
        var fundCords2 = this.getDirections(3);
        fundCords = fundCords.concat(fundCords2)
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 2;

            let norKer = new Eatgrass(this.x, this.y);
            eatArr.push(norKer);
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }
            for (var i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                }
            }
        }

        if (this.multiply == 10) {
            this.mul()
            this.multiply = 0;
        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        var fundCords = this.getDirections(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            var norEaterpredator = new Eaterpredator(x, y);
            eaterpredatorArr.push(norEaterpredator);
            matrix[y][x] = 5;
            // this.multiply = 0;
        }
    }

    //die() մահանալ
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eaterpredatorArr) {
            if (this.x == eaterpredatorArr[i].x && this.y == eaterpredatorArr[i].y) {
                eaterpredatorArr.splice(i, 1);
            }
        }
    }
}