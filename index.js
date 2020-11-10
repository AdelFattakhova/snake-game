const grid = document.querySelector('.grid');
const startBtn = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let score = 0;
scoreDisplay.textContent = score;
let direction = 1;
const gridWidth = 20;
let appleIndex;
let timerId = 0;
let intervalTime = 1000;
let speed = 0.9;

function createGrid() {
  for (let i = 0; i < gridWidth*gridWidth; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    squares.push(square);
    grid.append(square);
  }
}
createGrid();

currentSnake.forEach(i => squares[i].classList.add('snake'))

function startGame() {
  if (grid.classList.contains('grid-faded')) {
    grid.classList.remove('grid-faded');
  }
  clearTimeout(timerId);
  setDefaults();
  timerId = setTimeout(move, intervalTime);

  generateApples();
}

function setDefaults() {
  squares.forEach(square => square.classList.remove('snake'));
  if (appleIndex) {
    squares[appleIndex].classList.remove('apple');
  }
  currentSnake = [2, 1, 0];
  currentSnake.forEach(item => squares[item].classList.add('snake'));
  score = 0;
  scoreDisplay.textContent = score;

  direction = 1;
  intervalTime = 1000;
}

function move() {
  if (
    (currentSnake[0] + gridWidth >= gridWidth*gridWidth && direction === gridWidth) ||
    (currentSnake[0] % gridWidth === 0 && direction === -1) ||
    (currentSnake[0] - gridWidth < 0 && direction === -gridWidth) ||
    (currentSnake[0] % gridWidth === gridWidth - 1 && direction === 1) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) {
    grid.classList.add('grid-faded');
    setTimeout(setDefaults, 900);
    return clearTimeout(timerId);
  }
  
  let tail = currentSnake.pop();
  squares[tail].classList.remove('snake');
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    currentSnake.push(tail);
    generateApples();

    score++;
    scoreDisplay.textContent = score;

    intervalTime *= speed;
  }

  squares[currentSnake[0]].classList.add('snake');
  timerId = setTimeout(move, intervalTime)
}

function control(e) {
  if(e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -gridWidth;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    e.preventDefault();
    direction = gridWidth;
  }

  if (e.keyCode === 32) {
    e.preventDefault();
    startGame();
  }
}

document.addEventListener('keydown', control);

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while(squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple');
}

startBtn.addEventListener('click', startGame);