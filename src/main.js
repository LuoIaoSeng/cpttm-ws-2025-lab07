const container = document.querySelector('#container')
const timeF = document.querySelector('#time')
const scoreF = document.querySelector('#score')

let score = 0
let time = 30

function updateTime() {
    timeF.innerHTML = parseInt(time)
}

function updateScore() {
    scoreF.innerHTML = score.toFixed(1)
}

class Bubble {
    constructor(id) {

        this.id = id

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

        this.c = circle

        const r = parseInt(Math.random() * 20 + 10)
        const x = parseInt(Math.random() * (600 - r)) + r

        circle.addEventListener('click', () => {
            if (time > 0) {
                score += 3 - r / 10
                updateScore()
                this.destroy()
            }
        })

        circle.setAttributeNS(null, 'fill', `url(#g${parseInt(Math.random() * 4 + 1)})`)
        circle.setAttributeNS(null, 'r', r)
        circle.setAttributeNS(null, 'cx', x)
        circle.setAttributeNS(null, 'cy', 400)

        this.speed = Math.random() * 5 + 1

        this.coord = {
            x,
            y: 400
        }

        this.dir = {
            x: Math.random() * 1 - 1,
            y: -1
        }

        const length = Math.sqrt(this.dir.x * this.dir.x + this.dir.y * this.dir.y)
        this.dir.x /= length
        this.dir.y /= length

        container.appendChild(circle)

        this.setCoord()
    }
    destroy() {
        bubbles = bubbles.filter((item) => item.id !== this.id)
        container.removeChild(this.c)
    }
    setCoord() {

        this.c.setAttributeNS(null, 'cx', this.coord.x)
        this.c.setAttributeNS(null, 'cy', this.coord.y)
    }
    move() {
        this.coord.x += this.dir.x * this.speed
        this.coord.y += this.dir.y * this.speed
        this.setCoord()
        if (this.coord.y < 0) {
            this.destroy()
        }
    }
}

let bubbles = []

let tcounter = 0
let idcounter = 0

function run() {

    if (time > 0) {
        tcounter += 1 / 60

        if (tcounter > 0.5) {
            bubbles.push({
                id: idcounter,
                obj: new Bubble(idcounter)
            })
            idcounter += 1
            tcounter = 0
        }

        bubbles.forEach((item) => {
            item.obj.move()
        })

        time -= 1 / 60
        updateTime()
    }

    a = requestAnimationFrame(run)
}

updateScore()
updateTime()
let a = requestAnimationFrame(run)

document.querySelector('#restart').addEventListener('click', () => {
    cancelAnimationFrame(a)
    time = 30
    score = 0
    bubbles.forEach((item) => {
        container.removeChild(item.obj.c)
    })
    bubbles = []
    updateScore()
    updateTime()
    a = requestAnimationFrame(run)
})
