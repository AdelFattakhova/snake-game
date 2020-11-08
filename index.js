const grid = document.querySelector('.grid');
const startBtn = document.getElementById('start');
const score = document.getElementById('score');
let squares = [];
let currentSnake = [0, 1, 2];

function createGrid() {
  for (let i = 0; i < 400; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    squares.push(square);
    grid.append(square);
  }
}
createGrid()

currentSnake.forEach(i => squares[i].classList.add('snake'))