var canvas, ctx
var LARGURA
var ALTURA
var frames
var GAMEOVER

var animationFramID

function clique(event) {

}

$(function () {
    criarCanvas()
    drawInitialScreen()
})

function criarCanvas() {
    ALTURA = window.innerHeight
    LARGURA = window.innerWidth

    if (LARGURA >= 500) {
        LARGURA = 600
        ALTURA = 550
    }

    canvas = document.createElement("canvas")
    canvas.width = LARGURA
    canvas.height = ALTURA

    ctx = canvas.getContext("2d")
    var jogoID = document.getElementById("jogo")
    jogoID.appendChild(canvas)

    document.addEventListener("mousedown", clique)
}

function iniciar() {
    window.cancelAnimationFrame(animationFramID)
    inicializarVariaveis()

    run()
}

function inicializarVariaveis() {
    // Globais
    frames = 0
    GAMEOVER = false

    // Locais
    enemy.reset()
    towerLife.reset()
}

function run() {
    if (!GAMEOVER) {
        update()
        draw()
    }
    else {
        drawGameOver()
    }

    animationFramID = window.requestAnimationFrame(run)
}

function update() {
    frames++

    enemy.update()
}

function draw() {
    drawBrackground()

    tower.draw()
    enemy.draw()

    drawUI()
}

//#region draws
function drawBrackground() {
    ctx.fillStyle = "#50beff"
    ctx.fillRect(0, 0, this.LARGURA, this.ALTURA)
    chao.draw()
}

var chao = {
    height: 150,
    color: "#ffdf70",

    draw: function () {
        ctx.fillStyle = this.color
        ctx.fillRect(0, ALTURA - this.height, LARGURA, this.height)
    }
}

var enemy = {
    radius: 25,
    posX: 30,
    posY: 460,
    speed: 5,
    color: 'red',

    attack: 0.25,

    update: function () {
        if (this.posX + 2 * this.radius < tower.posX) {
            this.posX += this.speed
        }
        else {
            if (towerLife.currentLife > 0) {
                towerLife.currentLife -= this.attack
            }
            else {
                GAMEOVER = true
            }
        }
    },

    draw: function () {
        // Desenha circulo
        ctx.beginPath()
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = this.color
        ctx.fill()

        // Contorno
        ctx.lineWidth = 7
        ctx.strokeStyle = '#770000'
        ctx.stroke()
    },

    reset: function () {
        this.posX = 30
    }
}

var tower = {
    height: 250,
    color: "gray",
    posX: 450,

    draw: function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.posX, ALTURA - 1.1 * this.height, LARGURA, this.height)

        // Contorno
        ctx.lineWidth = 7
        ctx.strokeStyle = '#050505'
        ctx.strokeRect(this.posX, ALTURA - 1.1 * this.height, LARGURA, this.height)
    }
}

//#region UI
function drawInitialScreen() {
    initialScreen.draw()
}

var initialScreen = {
    colorBottom: '#1a1a1a',
    text: "RUSTIC DEFENSE",
    colorText: 'red',

    draw: function () {
        ctx.fillStyle = this.colorBottom
        ctx.fillRect(0, 0, LARGURA, ALTURA)

        ctx.font = '60px Impact'
        ctx.fillStyle = this.colorText
        ctx.fillText(this.text, 120, ALTURA / 2)
    }
}

function drawUI() {
    towerLife.draw()
}

var towerLife = {
    totalLife: 100,
    currentLife: 100,
    colorStroke: 'black',
    colorFilled: 'green',
    colorEmpty: 'red',

    posX: 380,

    draw: function () {
        // Vida vazia
        ctx.fillStyle = this.colorEmpty
        ctx.fillRect(this.posX, 10, 200, 30)

        // Vida Cheia
        ctx.fillStyle = this.colorFilled
        ctx.fillRect(this.posX, 10, this.currentLife / this.totalLife * 200, 30)

        // Contorno
        ctx.lineWidth = 7
        ctx.strokeStyle = this.colorStroke
        ctx.strokeRect(this.posX, 10, 200, 30)
    },

    reset: function () {
        this.totalLife = 100
        this.currentLife = 100
    }
}

function drawGameOver() {
    gameOver.draw()
}

var gameOver = {
    colorBottom: 'black',
    text: "FIM DE JOGO!",
    colorText: 'white',

    draw: function () {
        ctx.fillStyle = this.colorBottom
        ctx.fillRect(0, 0, LARGURA, ALTURA)

        ctx.font = '60px Impact'
        ctx.fillStyle = this.colorText
        ctx.fillText(this.text, 170, ALTURA / 2)
    }
}
//#endregion

//#endregion