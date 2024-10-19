import { createBoard } from './board';
let { board, rows, columns, boardsize, mines } = createBoard();

document.addEventListener('click', (e) => {
	if (!e.target.closest('.tile')) return;
	const tile = e.target;

	if (tile.dataset.mine === 'true') {
		tile.dataset.revealed = 'true';
	} else if (Number(tile.dataset.number) > 0) {
		tile.dataset.revealed = 'true';
		tile.textContent = tile.dataset.number;
	} else if (tile.dataset.status === 'empty') {
		const num = Number(tile.dataset.index);
		const [row, col] = calculateIndex(num, columns);
		revealEmptyTiles(board, row, col);
	}
});

document.addEventListener('contextmenu', (e) => {
	if (!e.target.closest('.tile')) return;
	flagTile(e.target);
	e.preventDefault();
});

document.addEventListener('click', (e) => {
	if (!e.target.closest('.difficulty')) return;
	const difficultyLevel = e.target.textContent.toLowerCase();
	board = createBoard(difficultyLevel);
});

function flagTile(target) {
	const numberOfMines = document.querySelector('.mine-counter');
	let count = Number(numberOfMines.textContent);
	if (target.dataset.status === 'flagged') {
		target.dataset.status = '';
		count += 1;
		numberOfMines.textContent = count;
	} else {
		target.dataset.status = 'flagged';
		count -= 1;
		numberOfMines.textContent = count;
	}
}

document.addEventListener('click', (e) => {
	if (!e.target.closest('.win-lose-button')) return;
	window.location.reload();
});

document.addEventListener('mousedown', (e) => {
	if (!e.target.closest('.tile')) return;
	if (Number(e.target.dataset.number) > 0) {
		const num = Number(e.target.dataset.index);
		const [row, col] = calculateIndex(num, columns);
		displayNeighbours(board, row, col);
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

function calculateIndex(index, columns) {
	const row = Math.floor(index / columns);
	const col = index % columns;
	return [row, col];
}

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
			if (board?.[i]?.[j].dataset.revealed === 'false') {
				board[i][j].dataset.neighbour = 'true';
			}
		}
	}
}

function hideNeighbours(board, row, col) {
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (board?.[i]?.[j].dataset.revealed === 'false') {
				board[i][j].dataset.neighbour = 'false';
			}
		}
	}
}
