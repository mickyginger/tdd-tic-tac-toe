function checkForWin(cells, player) {
  const rows = [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]]
  ];

  const columns = [
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]]
  ];

  const diagonals = [
    [cells[0], cells[4], cells[8]],
    [cells[2], cells[4], cells[6]]
  ];

  return checkLines(rows, player) || checkLines(columns, player) || checkLines(diagonals, player);
}

function checkLines(lines, player) {
  return lines.some(line => line.every(cell => cell.innerHTML === player));
}

function checkForTie(cells) {
  return cells.every(cell => cell.innerHTML);
}

function init() {
  let player = 'X';
  let gameOver = false;
  const display = document.getElementById('display');
  const cells = $('li').toArray();
  const resetBtn = document.querySelector('button');

  function handleCellClick(e) {
    if(e.currentTarget.innerHTML || gameOver) return;
    e.currentTarget.innerHTML = player;
    if(checkForWin(cells, player)) {
      gameOver = true;
      display.innerHTML = `${player} wins!`;
    } else if(checkForTie(cells)){
      gameOver = true;
      display.innerHTML = 'Game is a tie';
    } else {
      player = player === 'X' ? 'O' : 'X';
      display.innerHTML = `${player}'s turn`;
    }
  }

  function handleResetClick() {
    player = 'X';
    gameOver = false;
    cells.forEach(cell => cell.innerHTML = '');
    display.innerHTML = `${player}'s turn`;
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetBtn.addEventListener('click', handleResetClick);
}

window.addEventListener('DOMContentLoaded', init);
