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
        // To be implemented with the actual tile constraints
        // This will contain the logic for propagating constraints to neighbors
    }
}