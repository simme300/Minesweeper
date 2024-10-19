import { createBoard } from './board';
let { board, rows, columns, boardsize, mines } = createBoard();

document.addEventListener('click', (e) => {
	if (!e.target.closest('.tile')) return;
	if (e.target.dataset.status === 'flagged') {
		return;
	} else if (e.target.dataset.mine === 'true') {
		e.target.dataset.revealed = 'true';
	} else if (e.target.dataset.number) {
		e.target.dataset.revealed = 'true';
		e.target.textContent = e.target.dataset.number;
	} else {
		return;
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

// document.addEventListener('click', (e) => {
// 	if (!e.target.closest('.win-lose-button')) return;
// 	window.location.reload();
// });

function calculateIndex(index, columns) {
	const row = Math.floor(index / columns);
	const col = index % columns;
	return [row, col];
}

function revealEmptyTiles() {}
