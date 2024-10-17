import { compose } from 'lodash/fp';
import { difficulties } from './constants';

function createTwoDArray(rows = 9, cols = 9) {
	const tiles = document.querySelectorAll('.tile');
	const nodeListArray = Array.from(tiles);
	const twoDArray = [];
	const arrayLength = nodeListArray.length;
	for (let index = 0; index < arrayLength; index++) {
		nodeListArray[index].dataset.index = index;
	}
	for (let i = 0; i < arrayLength; i += 9) {
		twoDArray.push(nodeListArray.slice(i, i + cols));
	}
	return twoDArray;
}

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

function createBoard(difficulty = 'beginner') {
	const boardParent = document.querySelector('.board');
	const root = document.querySelector(':root');
	boardParent.innerHTML = '';

	const { rows, columns, boardsize } = difficulties[difficulty];
	root.style.setProperty('--rows', rows);
	root.style.setProperty('--cols', columns);

	for (let i = 0; i < boardsize; i++) {
		const tile = document.createElement('button');
		tile.classList.add('tile');
		tile.dataset.revealed = 'false';
		boardParent.appendChild(tile);
	}
}
createBoard();
const gameBoard = createTwoDArray();
console.table(gameBoard);

gameBoard[0][0].dataset.status = 'flagged';
