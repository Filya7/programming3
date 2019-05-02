var side = 25;
var xotArr = []; //խոտերի զանգված
var eatArr = []; //խոտակերների զանգված
var predatorArr = [];
var everyeaterArr = [];
var eaterpredatorArr = [];

let matrix = []; // Մատրիցի ստեղծում
let rows = 50; // Տողերի քանակ
let columns = 50; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
    matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 15) {
            matrix[y][x] = 0; // Մատրիցի 15 տոկոսը կլինի 0
        }
        if (a >= 20 && a < 35) {
            matrix[y][x] = 1; // Մատրիցի 25 տոկոսը կլինի 1
        }
        else if (a >= 5 && a < 25) {
            matrix[y][x] = 2; // Մատրիցի 20 տոկոսը կլինի 2
        }
        else if (a >= 50 && a < 60) {
            matrix[y][x] = 3; // Մատրիցի 10 տոկոսը կլինի 3
        }
        else if (a >= 80 && a < 90) {
            matrix[y][x] = 4; // Մատրիցի 10 տոկոսը կլինի 4
        }
        else if (a >= 75 && a < 95) {
            matrix[y][x] = 5; // Մատրիցի 20 տոկոսը կլինի 5
        }
    }
}




function setup() {
    noStroke();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');

    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            } else if (matrix[y][x] == 4) {
                var everyeater = new Eatgrassmama(x, y);
                everyeaterArr.push(everyeater);
            } else if (matrix[y][x] == 5) {
                var eaterpredator = new Eaterpredator(x, y);
                eaterpredatorArr.push(eaterpredator);
            }
        }
    }
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill("blueviolet");
                rect(j * side, i * side, side, side);
            }
        }
    }


    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in xotArr) {
        xotArr[i].mul();
    }

    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (var i in eatArr) {
        eatArr[i].eat();
    }

    // gishatichy utum e xotaker
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }

    // kerpar 1
    for (var i in eaterpredatorArr) {
        eaterpredatorArr[i].eat();
    }

    // kerpar 2
    for (var i in everyeaterArr) {
        everyeaterArr[i].eat();
    }
}

