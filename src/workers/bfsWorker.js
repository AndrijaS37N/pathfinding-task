// eslint-disable-next-line no-new-func
const workerGridResult = new Function('levelCounter', 'rows', 'columns', 'destX', 'destY', 'destination', `
		const workerMakeGrid = (_levelCounter, _rows, _columns, _destX, _destY) => {
			const grid = [];
			let indexCounter = 0;
			for (let i = 0; i < _rows; i += 1) {
				grid[i] = [];
				for (let j = 0; j < _columns; j += 1) {
					grid[i][j] = indexCounter;
					indexCounter += 1;
				}
			}
	
			for (let i = 0; i < _levelCounter; i += 1) {
				let randomRow = Math.floor(Math.random() * 10);
				let randomColumn = Math.floor(Math.random() * 10);
				while ((randomRow === 0 && randomColumn === 0) || (randomRow === _destX && randomColumn === _destY) || grid[randomRow][randomColumn] === 'block') {
					randomRow = Math.floor(Math.random() * 10);
					randomColumn = Math.floor(Math.random() * 10);
				}
				grid[randomRow][randomColumn] = 'block';
			}
			return grid;
		};
	
		const getNeighbours = (x, y, grid) => {
			const neighbours = [];
			const gridSize = grid.length;
			const down = x + 1;
			const up = x - 1;
			const left = y - 1;
			const right = y + 1;
	
			if (down < gridSize) {
				if (grid[down][y] !== 'block') neighbours.push(grid[down][y]);
			}
			if (up >= 0) {
				if (grid[up][y] !== 'block') neighbours.push(grid[up][y]);
			}
			if (left >= 0) {
				if (grid[x][left] !== 'block') neighbours.push(grid[x][left]);
			}
			if (right < gridSize) {
				if (grid[x][right] !== 'block') neighbours.push(grid[x][right]);
			}
	
			return neighbours;
		};
	
		const solve = (grid, _destination) => {
			const q = [];
			q.push(0);
	
			const adjacencyMap = new Map();
			const visited = [];
			const previous = [];
			let indexCounter = 0;
			for (let i = 0; i < grid.length; i += 1) {
				for (let j = 0; j < grid[i].length; j += 1) {
					previous[indexCounter] = null;
					visited[indexCounter] = false;
					adjacencyMap.set(grid[i][j], getNeighbours(i, j, grid));
					indexCounter += 1;
				}
			}
	
			visited[0] = true;
	
			while (q.length > 0) {
				const node = q.shift();
	
				if (node === _destination) break;
	
				const neighbours = adjacencyMap.get(node);
				neighbours.forEach((next) => {
					if (!visited[next]) {
						q.push(next);
						visited[next] = true;
						previous[next] = node;
					}
				});
			}
	
			return previous;
		};
	
		const reconstructPath = (grid, _destination, previousList) => {
			const path = [];
	
			let current = _destination;
			while (current !== null) {
				path.push(current);
				current = previousList[current];
			}
			const reversedPath = path.reverse();
			if (reversedPath[0] === grid[0][0]) {
				return reversedPath;
			}
			return [];
		};
	
		const bfs = (grid, _destination) => {
			const previousList = solve(grid, _destination);
			return reconstructPath(grid, _destination, previousList);
		};
	
		let grid;
		let res = [];
		while (res.length < 1) {
			grid = workerMakeGrid(levelCounter, rows, columns, destX, destY);
			res = bfs(grid, destination);
		}
	
		return { grid, res };
`);

export default workerGridResult;
