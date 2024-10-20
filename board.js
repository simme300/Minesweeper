import { difficulties } from './constants';

export function createBoard(difficulty = 'beginner') {
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
		tile.dataset.index = i;
		boardParent.appendChild(tile);
	}

	const board = createTwoDArray(rows, columns);
	const tileArray = Array.from(document.querySelectorAll('.tile'));
	placeMines(mines, boardsize, tileArray);
	surroundingMines(board, rows, columns);
	return { board, rows, columns, boardsize, mines };
}

export function createTwoDArray(rows = 9, cols = 9) {
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

export function placeMines(numMines, boardsize, arr) {
	const mineSet = new Set();
	while (mineSet.size < numMines) {
		const mine = randomNumberGenerator(0, boardsize - 1);
		mineSet.add(mine);
	}
	mineSet.forEach((mine) => {
		arr[mine].dataset.mine = 'true';
	});
	return mineSet;
}

export function surroundingMines(boardArray, rows, cols) {
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (boardArray[row][col].dataset.mine === 'true') {
				continue;
			}

			let mineCount = 0;

			for (let i = row - 1; i <= row + 1; i++) {
				for (let j = col - 1; j <= col + 1; j++) {
					if (boardArray?.[i]?.[j]?.dataset.mine === 'true') {
						mineCount++;
					}
				}
			}
			if (mineCount === 0) {
				boardArray[row][col].dataset.status = 'empty';
			} else {
				boardArray[row][col].dataset.number = `${mineCount}`;
			}
		}
	}
}

export function randomNumberGenerator(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export function calculateIndex(index, columns) {
	const row = Math.floor(index / columns);
	const col = index % columns;
	return [row, col];
}
