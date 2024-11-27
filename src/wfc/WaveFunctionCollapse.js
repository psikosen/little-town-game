export class WaveFunctionCollapse {
    constructor(width, height, tiles) {
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.grid = [];
    }

    initialize() {
        // Initialize the grid with all possibilities
        for (let y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x] = [...this.tiles];
            }
        }
    }

    collapse() {
        let iterations = 0;
        const maxIterations = this.width * this.height * 2;

        while (iterations < maxIterations) {
            const cell = this.findLowestEntropyCell();
            if (!cell) break;

            this.collapseCell(cell);
            this.propagate(cell);

            iterations++;
        }

        return this.grid;
    }

    findLowestEntropyCell() {
        let minEntropy = Infinity;
        let candidates = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.grid[y][x].length > 1) {
                    if (this.grid[y][x].length < minEntropy) {
                        minEntropy = this.grid[y][x].length;
                        candidates = [{x, y}];
                    } else if (this.grid[y][x].length === minEntropy) {
                        candidates.push({x, y});
                    }
                }
            }
        }

        return candidates.length > 0 ? 
            candidates[Math.floor(Math.random() * candidates.length)] : 
            null;
    }

    collapseCell({x, y}) {
        const options = this.grid[y][x];
        const chosen = options[Math.floor(Math.random() * options.length)];
        this.grid[y][x] = [chosen];
    }

    propagate({x, y}) {
        const stack = [{x, y}];

        while (stack.length > 0) {
            const current = stack.pop();
            const currentTile = this.grid[current.y][current.x][0];

            // Check all neighbors
            const neighbors = this.getNeighbors(current.x, current.y);
            
            for (const [dir, neighbor] of Object.entries(neighbors)) {
                if (!neighbor) continue;

                const options = this.grid[neighbor.y][neighbor.x];
                const validOptions = options.filter(option => 
                    this.tilesCompatible(currentTile, option, dir)
                );

                if (validOptions.length < options.length) {
                    this.grid[neighbor.y][neighbor.x] = validOptions;
                    stack.push(neighbor);
                }
            }
        }
    }

    getNeighbors(x, y) {
        return {
            top: y > 0 ? {x, y: y - 1} : null,
            right: x < this.width - 1 ? {x: x + 1, y} : null,
            bottom: y < this.height - 1 ? {x, y: y + 1} : null,
            left: x > 0 ? {x: x - 1, y} : null
        };
    }

    tilesCompatible(tile1, tile2, direction) {
        const oppositeDir = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right'
        };

        return tile1.constraints[direction].includes(tile2.id) &&
               tile2.constraints[oppositeDir[direction]].includes(tile1.id);
    }
}