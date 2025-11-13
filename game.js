const levels = [
    {
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 }
    },
    {
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 }
    },
    {
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 }
    }
];

class MazeGame {
    constructor() {
        this.canvas = document.getElementById('maze-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentLevel = 0;
        this.steps = 0;
        this.time = 0;
        this.timer = null;
        this.cellSize = 40;
        this.playerPos = { x: 0, y: 0 };
        this.goalPos = { x: 0, y: 0 };
        this.isGameActive = false;

        this.touchStartX = 0;
        this.touchStartY = 0;

        this.init();
        this.setupEventListeners();
    }

    init() {
        this.loadLevel(this.currentLevel);
        this.resizeCanvas();
        this.draw();
    }

    loadLevel(levelIndex) {
        if (levelIndex >= levels.length) {
            levelIndex = 0;
        }

        const level = levels[levelIndex];
        this.maze = level.maze.map(row => [...row]);
        this.playerPos = { ...level.start };

        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                if (this.maze[y][x] === 3) {
                    this.goalPos = { x, y };
                }
            }
        }

        this.steps = 0;
        this.time = 0;
        this.isGameActive = true;
        this.updateStats();
        this.startTimer();
        this.resizeCanvas();

        document.getElementById('level').textContent = levelIndex + 1;
        document.getElementById('next-level-btn').style.display = 'none';
        document.getElementById('victory-message').style.display = 'none';
    }

    resizeCanvas() {
        const cols = this.maze[0].length;
        const rows = this.maze.length;

        const maxWidth = Math.min(500, window.innerWidth - 100);
        this.cellSize = Math.floor(maxWidth / cols);

        this.canvas.width = cols * this.cellSize;
        this.canvas.height = rows * this.cellSize;

        this.draw();
    }

    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            if (this.isGameActive) {
                this.time++;
                this.updateStats();
            }
        }, 1000);
    }

    updateStats() {
        document.getElementById('steps').textContent = this.steps;
        document.getElementById('time').textContent = this.time + 's';
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                if (this.maze[y][x] === 1) {
                    this.ctx.fillStyle = '#2d3748';
                    this.ctx.fillRect(
                        x * this.cellSize,
                        y * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    );
                } else {
                    this.ctx.fillStyle = '#f7fafc';
                    this.ctx.fillRect(
                        x * this.cellSize,
                        y * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    );
                }

                this.ctx.strokeStyle = '#e2e8f0';
                this.ctx.strokeRect(
                    x * this.cellSize,
                    y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }

        this.ctx.fillStyle = '#48bb78';
        this.ctx.beginPath();
        this.ctx.arc(
            this.goalPos.x * this.cellSize + this.cellSize / 2,
            this.goalPos.y * this.cellSize + this.cellSize / 2,
            this.cellSize / 3,
            0,
            Math.PI * 2
        );
        this.ctx.fill();

        const gradient = this.ctx.createRadialGradient(
            this.playerPos.x * this.cellSize + this.cellSize / 2,
            this.playerPos.y * this.cellSize + this.cellSize / 2,
            0,
            this.playerPos.x * this.cellSize + this.cellSize / 2,
            this.playerPos.y * this.cellSize + this.cellSize / 2,
            this.cellSize / 3
        );
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(
            this.playerPos.x * this.cellSize + this.cellSize / 2,
            this.playerPos.y * this.cellSize + this.cellSize / 2,
            this.cellSize / 3,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    move(dx, dy) {
        if (!this.isGameActive) return;

        const newX = this.playerPos.x + dx;
        const newY = this.playerPos.y + dy;

        if (
            newX >= 0 &&
            newX < this.maze[0].length &&
            newY >= 0 &&
            newY < this.maze.length &&
            this.maze[newY][newX] !== 1
        ) {
            this.playerPos.x = newX;
            this.playerPos.y = newY;
            this.steps++;
            this.updateStats();
            this.draw();

            if (this.playerPos.x === this.goalPos.x && this.playerPos.y === this.goalPos.y) {
                this.winLevel();
            }
        }
    }

    winLevel() {
        this.isGameActive = false;
        clearInterval(this.timer);

        document.getElementById('victory-message').style.display = 'block';
        document.getElementById('next-level-btn').style.display = 'inline-block';
    }

    nextLevel() {
        this.currentLevel++;
        if (this.currentLevel >= levels.length) {
            this.currentLevel = 0;
        }
        this.loadLevel(this.currentLevel);
        this.draw();
    }

    reset() {
        this.loadLevel(this.currentLevel);
        this.draw();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    this.move(0, -1);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    this.move(0, 1);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    this.move(-1, 0);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    this.move(1, 0);
                    break;
            }
        });

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.touchStartX = touch.clientX;
            this.touchStartY = touch.clientY;
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - this.touchStartX;
            const deltaY = touch.clientY - this.touchStartY;

            const minSwipeDistance = 30;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0) {
                        this.move(1, 0);
                    } else {
                        this.move(-1, 0);
                    }
                }
            } else {
                if (Math.abs(deltaY) > minSwipeDistance) {
                    if (deltaY > 0) {
                        this.move(0, 1);
                    } else {
                        this.move(0, -1);
                    }
                }
            }
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.reset();
        });

        document.getElementById('next-level-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
}

const game = new MazeGame();
