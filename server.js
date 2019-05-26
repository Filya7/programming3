var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs')

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
var timecount = 0
var season = "winter"

var Grass = require("./grass")
var Eatgrass = require("./grasseater")
var Predator = require("./predator")
var Eatgrassmama = require("./eatgrassmama")
var Eaterpredator = require("./eatpredator")

xotArr = [];
eatArr = [];
predatorArr = [];
everyeaterArr = [];
eaterpredatorArr = [];

matrix = []
rows = 50;
columns = 50;

for (let y = 0; y < rows; y++) {
    matrix[y] = [];
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 25) {
            matrix[y][x] = 0; // Մատրիցի 25 տոկոսը կլինի 0
        }
        if (a >= 25 && a < 45) {
            matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
        }
        else if (a >= 45 && a < 60) {
            matrix[y][x] = 2; // Մատրիցի 15 տոկոսը կլինի 2
        }
        else if (a >= 60 && a < 75) {
            matrix[y][x] = 3; // Մատրիցի 15 տոկոսը կլինի 3
        }
        else if (a >= 75 && a < 90) {
            matrix[y][x] = 4; // Մատրիցի 15 տոկոսը կլինի 4
        }
        else if (a >= 90 && a < 100) {
            matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
        }
    }
}

function createObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            } else if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
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
createObjects()
var obj = {
    'season': season,
    'matrix': matrix
}
function game() {
    timecount++
    if (timecount <= 8) {
        obj.season = "winter"
    }
    else if (timecount <= 16) {
        obj.season = "spring"
    }
    else if (timecount <= 24) {
        obj.season = "summer"
    }
    else if (timecount <= 32) {
        obj.season = "autumn"

    }
    else {
        timecount = 0
    }

    for (var i in xotArr) {
        xotArr[i].mul();
    }

    for (var i in eatArr) {
        eatArr[i].eat();
    }

    for (var i in predatorArr) {
        predatorArr[i].eat();
    }

    for (var i in eaterpredatorArr) {
        eaterpredatorArr[i].eat();
    }

    for (var i in everyeaterArr) {
        everyeaterArr[i].eat();
    }

    io.sockets.emit("draw matrix", obj)
}
setInterval(game, 100)
io.on('connection', function (socket) {
    socket.on('pushEaterPredator', function () {
        for (var a = 0; a < 10; a++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5
                eaterpredatorArr.push(new Eaterpredator(x, y))
            }
        }
    })
    socket.on('pushEatGrass', function () {
        for (var a = 0; a < 10; a++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] = 0) {
                matrix[y][x] = 2
                eatArr.push(new Eatgrass(x, y))
            }
        }
    })
    socket.on('killGrass', function () {
        xotArr = []
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[0].length; x++) {
                matrix[y][x] = 0
            }
        }
    })
    socket.on('killGrassEater', function () {
        eatArr = []
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[0].length; x++) {
                matrix[y][x] = 0
            }
        }
    })
    socket.on('kill', function () {
        xotArr = [];
        eatArr = [];
        predatorArr = [];
        everyeaterArr = [];
        eaterpredatorArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[0].length; x++) {
                matrix[y][x] = 0
            }
        }
    })
}
)
var statistics = {}
setInterval(function () {
    statistics.Grass = xotArr.length
    statistics.Eatgrass = eatArr.length
    statistics.Predator = predatorArr.length
    statistics.Eatgrassmama = everyeaterArr.length
    statistics.Eaterpredator = eaterpredatorArr.length
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("jsonn")
    })
})
