import { compose } from 'lodash/fp';

function createTwoDArray(rows = 9, cols = 9) {
	const boardArray = [];

	for (let row = 0; row < rows; row++) {
		boardArray[row] = [];
		for (let col = 0; col < cols; col++) {
			boardArray[row][col] = row * rows + col;
		}
	}
	return boardArray;
}

const gameBoard = createTwoDArray();
console.table(gameBoard);

const tiles = Array.from(document.querySelectorAll('.tile'));

document.addEventListener('contextmenu', (e) => {
	if (!e.target.closest('.tile')) return;
	const tile = e.target;
	if (tile.dataset.status === 'flagged') {
		tile.dataset.status = '';
	} else {
		tile.dataset.status = 'flagged';
	}
	e.preventDefault();
});
