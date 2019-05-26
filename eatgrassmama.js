let LiveForm = require("./liveForm")
let Eatgrass = require("./grasseater")
// kerpar 1
module.exports = class Eatgrassmama extends LiveForm {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 10;
        this.multiply = 0;
    }
    //move() շարժվել
    move() {
        var fundCords = this.getDirections(0);
        var fundCords1 = this.getDirections(1);
        fundCords = fundCords.concat(fundCords1)
        var cord = []
        fundCords.push(cord)

        if (cord == true) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    //eat()-ուտել
    eat() {
        var fundCords1 = this.getDirections(1);
        var fundCords = this.getDirections(3);
        fundCords = fundCords.concat(fundCords1)
        var cord = fundCords[Math.floor(Math.random() * fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 2;
            let norEat = new Eatgrass(this.x, this.y);
            eatArr.push(norEat);
            this.x = x;
            this.y = y;
        }
         for (var i in xotArr) {
            if (x == xotArr[i].x && y == xotArr[i].y) {
                xotArr.splice(i, 1);
            }
        } for (var i in predatorArr) {
            if (x == predatorArr[i].x && y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }

        if (this.multiply == 20) {
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
    mul() {
        var fundCords1 = this.getDirections(0);
        var fundCords2 = this.getDirections(2);
        var fundCords3 = this.getDirections(3);
        fundCordss = fundCords1.concat(fundCords2)
        fundCords = fundCordss.concat(fundCords3)
        var cord = fundCords[Math.floor(Math.random() * fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            var norEatgrassmama = new Eatgrassmama(x, y);
            everyeaterArr.push(norEatgrassmama)
            matrix[y][x] = 2;
        }
    }

    //die() մահանալ
    die() {

        matrix[this.y][this.x] = 0;

        for (var i in everyeaterArr) {
            if (this.x == everyeaterArr[i].x && this.y == everyeaterArr[i].y) {
                everyeaterArr.splice(i, 1);
            }
        }
    }
}