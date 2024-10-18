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
	for (let i = 0; i < arrayLength; i += cols) {
		twoDArray.push(nodeListArray.slice(i, i + cols));
	}
	return twoDArray;
}

document.addEventListener('click', (e) => {
	if (!e.target.closest('.tile')) return;
	if (e.target.dataset.status !== 'flagged') {
		e.target.dataset.revealed = 'true';
	}
});

document.addEventListener('contextmenu', (e) => {
	if (!e.target.closest('.tile')) return;
	flagMine(e.target);
	e.preventDefault();
});

function createBoard(difficulty = 'beginner') {
	const boardParent = document.querySelector('.board');
	const numberOfMines = document.querySelector('.mine-counter');
	const root = document.querySelector(':root');
	boardParent.innerHTML = '';

	const { rows, columns, boardsize, mines } = difficulties[difficulty];
	root.style.setProperty('--rows', rows);
	root.style.setProperty('--cols', columns);
	numberOfMines.textContent = mines;

	for (let i = 0; i < boardsize; i++) {
		const tile = document.createElement('button');
		tile.classList.add('tile');
		tile.dataset.revealed = 'false';
		boardParent.appendChild(tile);
	}

	const tileArray = Array.from(document.querySelectorAll('.tile'));
	placeMines(mines, boardsize, tileArray);
}

document.addEventListener('DOMContentLoaded', (e) => {
	createBoard();
	const board = createTwoDArray();
});

document.addEventListener('click', (e) => {
	if (!e.target.closest('.difficulty')) return;
	const difficultyLevel = e.target.textContent.toLowerCase();
	createBoard(difficultyLevel);
	const { rows, columns } = difficulties[difficulties];
	const board = createTwoDArray(rows, columns);
});

function flagMine(target) {
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

function placeMines(numMines, boardsize, arr) {
	const mineSet = new Set();
	while (mineSet.size < numMines) {
		const mine = randomNumberGenerator(0, boardsize);
		mineSet.add(mine);
	}
	mineSet.forEach((mine) => {
		arr[mine].dataset.mine = 'true';
	});
}

function randomNumberGenerator(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// document.addEventListener('click', (e) => {
// 	if (!e.target.closest('.win-lose-button')) return;
// 	window.location.reload();
// });

function displaySurroundingMines(boardArray) {}
