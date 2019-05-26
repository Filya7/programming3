//խոտակերի կլասը
let LiveForm = require("./liveForm")
    module.exports = class Eatgrass extends LiveForm {
    constructor(x,y,index) {
        super(x,y,index)
        this.energy = 3;
        this.multiply = 0;
    }
    
    //move() շարժվել
    move() {
        var fundCords = this.getDirections(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }

    //eat()-ուտել
    eat() {
        var fundCords = this.getDirections(1);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

            this.multiply++;
            this.energy++;

            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }

            if (this.multiply == 10) {
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

    //mul() բազմանալ
    mul() {
        var fundCords = this.getDirections(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);
            matrix[y][x] = 2;
        }
    }

    //die() մահանալ
    die() {
        matrix[this.y][this.x] = 0;

        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }
}
