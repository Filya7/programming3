// kerpar 2
class Eaterpredator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 30;
        this.directions = [];
    }

    //շրջապատի հետազոտության մատրիցը
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords1 = this.getDirections(0);
        var fundCords = this.getDirections(1);
        fundCords = fundCords.concat(fundCords1)
        var cord = random(fundCords);

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
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords = this.getDirections(2);
        var fundCords2 = this.getDirections(3);
        fundCords = fundCords.concat(fundCords2)
        var cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 2;

            let norKer = new Eatgrass(this.x, this.y);
            eatArr.push(norKer);
            //թարմացնում է սեփական կորդինատները
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

        //փոխում է սեփական կորդինատները օբյեկտի մեջ

        //բազմացման գործակիցը մեծացնում է
       

        //մեծացնում է էներգիան
        

        //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
        //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
        
        //եթե պատրաստ է բազմացմանը, բազմանում է 
        if (this.multiply == 10) {
            this.mul()
            this.multiply = 0;
        }
        else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var norEaterpredator = new Eaterpredator(x, y);
            eaterpredatorArr.push(norEaterpredator);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 5;
            // this.multiply = 0; //????????
        }
    }
    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in eaterpredatorArr) {
            if (this.x == eaterpredatorArr[i].x && this.y == eaterpredatorArr[i].y) {
                eaterpredatorArr.splice(i, 1);
            }
        }
    }
}