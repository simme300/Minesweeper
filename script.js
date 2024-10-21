import { createBoard, calculateIndex } from './board';
import { timerFunction } from './timer';
let { board, rows, columns, boardsize, mines } = createBoard();
let timer = null;
let isRunning = false;

document.addEventListener('click', (e) => {
	if (!e.target.closest('.tile')) return;
	playerClick(e.target);
	if (!isRunning) {
		timer = timerFunction();
		isRunning = true;
	}
	winningGameState(board, rows, columns);
});

document.addEventListener('contextmenu', (e) => {
	if (!e.target.closest('.tile')) return;
	flagTile(e.target);
	winningGameState(board, rows, columns);
	e.preventDefault();
});

document.addEventListener('click', (e) => {
	if (!e.target.closest('.difficulty')) return;
	const difficultyLevel = e.target.textContent.toLowerCase();
	board = createBoard(difficultyLevel);
});

document.addEventListener('mousedown', (e) => {
	if (!e.target.closest('.tile')) return;
	if (e.target.dataset.revealed === 'true') {
		if (Number(e.target.dataset.number) > 0) {
			const num = Number(e.target.dataset.index);
			const [row, col] = calculateIndex(num, columns);
			displayNeighbours(board, row, col);
		}
	}
});

document.addEventListener('mouseup', (e) => {
	if (!e.target.closest('.tile')) return;
	if (Number(e.target.dataset.number) > 0) {
		const num = Number(e.target.dataset.index);
		const [row, col] = calculateIndex(num, columns);
		hideNeighbours(board, row, col);
	}
});

document.addEventListener('click', (e) => {
	if (!e.target.closest('.reload-button')) return;
	window.location.reload();
});

function revealEmptyTiles(board, row, col) {
	if (
		!board?.[row]?.[col] ||
		board[row][col].dataset.revealed === 'true' ||
		board[row][col].dataset.status === 'flagged'
	) {
		return;
	}

	board[row][col].dataset.revealed = 'true';

	if (Number(board?.[row]?.[col]?.dataset.number > 0)) {
		board[row][col].dataset.revealed = 'true';
		board[row][col].textContent = board[row][col].dataset.number;
	}

	if (board[row][col].dataset.status !== 'empty') {
		return;
	}

	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (i === row && j === col) continue;
			revealEmptyTiles(board, i, j);
		}
	}
}

function displayNeighbours(board, row, col) {
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (board?.[i]?.[j]?.dataset.revealed === 'false') {
				board[i][j].dataset.neighbour = 'true';
			}
		}
	}
}

function hideNeighbours(board, row, col) {
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (board?.[i]?.[j]?.dataset.neighbour === 'true') {
				delete board[i][j].dataset.neighbour;
			}
		}
	}
}

function playerClick(target) {
	if (target.dataset.mine === 'true') {
		target.dataset.revealed = 'true';
		gameOver(board, rows, columns);
	} else if (Number(target.dataset.number) > 0) {
		target.dataset.revealed = 'true';
		target.textContent = target.dataset.number;
	} else if (target.dataset.status === 'empty') {
		const num = Number(target.dataset.index);
		const [row, col] = calculateIndex(num, columns);
		revealEmptyTiles(board, row, col);
	}
}

function flagTile(target) {
	const numberOfMines = document.querySelector('.mine-counter');
	let count = Number(numberOfMines.textContent);
	if (target.dataset.status === 'flagged') {
		target.dataset.status = 'empty';
		count += 1;
		numberOfMines.textContent = count;
	} else {
		target.dataset.status = 'flagged';
		count -= 1;
		numberOfMines.textContent = count;
	}
}

function gameOver(board, r, c) {
	for (let row = 0; row < r; row++) {
		for (let col = 0; col < c; col++) {
			if (board[row][col].dataset.mine === 'true')
				board[row][col].dataset.revealed = 'true';
		}
	}
	const allTiles = document.querySelectorAll('.tile');
	allTiles.forEach((tile) => {
		if (tile.dataset.mine !== 'true') {
			tile.classList.add('game-over');
		}
	});
	if (isRunning) {
		clearInterval(timer);
	}
}

function winningGameState(board, r, c) {
	let flaggedTiles = 0;
	let revealedTiles = 0;

	for (let row = 0; row < r; row++) {
		for (let col = 0; col < c; col++) {
			if (
				board[row][col].dataset.revealed === 'false' &&
				board[row][col].dataset.status === 'flagged' &&
				board[row][col].dataset.mine === 'true'
			) {
				flaggedTiles++;
			}
			if (board[row][col].dataset.revealed === 'true') {
				revealedTiles++;
			}
		}
	}
	if (flaggedTiles === mines && revealedTiles === boardsize - flaggedTiles) {
		console.log('YOU WON');
	}
}

// TODO
// Implement timer
// finish logic and styling for a winning board / losing
// adjust resett button text or styles
// fix minor issue bugs
// refactor
