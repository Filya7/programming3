var side = 25;
var socket = io()

socket.on("draw matrix", drawMatrix)
function setup() {
    noStroke();
    createCanvas(40 * side, 40 * side);
    background('#acacac');
}

function drawMatrix(obj) {
    season = obj.season
    matrix = obj.matrix
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                console.log(season);
                
                if (season == "winter") {
                    fill("white");
                    rect(j * side, i * side, side, side);
                }
                else if (season == "autumn") {
                    fill("#D89135"); /*orange*/
                    rect(j * side, i * side, side, side);
                }
                else {
                    fill("green");
                    rect(j * side, i * side, side, side);
                }
            } else if (matrix[i][j] == 2) {
                if (season == "winter") {
                    fill("black");
                    rect(j * side, i * side, side, side);
                }
                else if (season == "autumn") {
                    fill("#F8A7F0"); /*pink*/
                    rect(j * side, i * side, side, side);
                }
                else {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                }

            } else if (matrix[i][j] == 0) {
                if (season == "winter") {
                    fill("#CFA7BF");/*pinkviolet*/
                    rect(j * side, i * side, side, side);
                }
                else if (season == "autumn") {
                    fill("#E1CD93");/*bacyellow*/
                    rect(j * side, i * side, side, side);
                }
                else if (season == "spring") {
                    fill("#92D380");/*bacgreen*/
                    rect(j * side, i * side, side, side);
                }
                else {
                    fill("#4DC7F2");/*bacblue*/
                    rect(j * side, i * side, side, side);
                }

            }
            else if (matrix[i][j] == 3) {
                if (season == "winter") {
                    fill("#E7576A");/*orange*/
                    rect(j * side, i * side, side, side);
                }
                else if (season == "autumn") {
                    fill("#FB4119");/*bacred*/
                    rect(j * side, i * side, side, side);
                }
                else {
                    fill("red");
                    rect(j * side, i * side, side, side);
                }
            }
            else if (matrix[i][j] == 4) {
                if (season == "winter") {
                    fill("#0C587A");/*darcblue*/
                    rect(j * side, i * side, side, side);
                }
                else if (season == "autumn") {
                    fill("#EBEB1F");/*yellllow*/
                    rect(j * side, i * side, side, side);
                }
                else {
                    fill("#A198E3");/*bacviolet*/
                    rect(j * side, i * side, side, side);
                }
            }
            else if (matrix[i][j] == 5) {
                if (season == "winter") {
                    fill("#BB608B");/*redpink*/
                    rect(j * side, i * side, side, side);
                }
                else if (season == "autumn") {
                    fill("#510D4B");/*darcviolet*/
                    rect(j * side, i * side, side, side);
                }
                else {
                    fill("blueviolet");
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}

    function pushEaterPredator() {
        socket.emit('pushEaterpredator')
    }
    function pushEatGrass() {
        socket.emit('pushEatGrass')
    }
    function killGrass() {
        socket.emit('killGrass')
    }
    function killEatGrass() {
        socket.emit('killGrassEater')
    }
    function kill() {
        socket.emit('kill')
    }