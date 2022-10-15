const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#C71585', '#DB7093']
let time = 0
let score = 0
let interval;

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

function startGame() {
    interval = setInterval(decreaseTime, 1000)
    createRandomHeart()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
      finishGame()  
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    clearInterval(interval)
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class='primary'>${score}</span></h1>` 
}

function createRandomHeart(){
    const heart = document.createElement('div')
    const container = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const color = getRandomColor()
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(20, width - 20 - size)
    const y = getRandomNumber(20, height - 20 - size)

    container.classList.add('container')
    container.style.width = `${size}px`
    container.style.height = `${size}px`
    container.style.top = `${y}px`
    container.style.left = `${x}px`

    heart.classList.add('heart')
    heart.style.background = color

    container.append(heart)
    board.append(container)

    container.addEventListener('click', event => {
        score++
        event.target.remove()
        createRandomHeart()
    })
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
} 

function getRandomColor(){
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
