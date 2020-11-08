const grid = document.querySelector('.grid');
const startBtn = document.getElementById('start');
const score = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let timerId = setTimeout(move, 1000);
const gridWidth = 20;
let appleIndex;

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

function move() {
  if (
    (currentSnake[0] + gridWidth >= gridWidth*gridWidth && direction === gridWidth) ||
    (currentSnake[0] % gridWidth === 0 && direction === -1) ||
    (currentSnake[0] - gridWidth < 0 && direction === -gridWidth) ||
    (currentSnake[0] % gridWidth === gridWidth - 1 && direction === 1) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) {
    return clearTimeout(timerId);
  }
  
  let tail = currentSnake.pop();
  squares[tail].classList.remove('snake');
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add('snake');
  timerId = setTimeout(move, 1000)
}

function control(e) {
  if(e.keyCode === 39) {
    console.log('right');
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log('up');
    direction = -gridWidth;
  } else if (e.keyCode === 37) {
    console.log('left');
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log('down');
    direction = gridWidth;
  }
}

document.addEventListener('keydown', control);

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while(squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple');
}

generateApples();