export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.map = null;
        this.tileSize = 32; // Size of each tile
    }

    create() {
        // Initialize WFC with tile definitions
        const tileDefinitions = this.createTileDefinitions();
        const wfc = new WaveFunctionCollapse(20, 20, tileDefinitions);
        wfc.initialize();
        const generatedMap = wfc.collapse();

        // Create the map
        this.createMap(generatedMap);

        // Create player
        this.createPlayer();
        
        // Set up camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.tileSize * 20, this.tileSize * 20);
    }

    createTileDefinitions() {
        // Define your tiles and their constraints
        return [
            {
                id: 'grass',
                sprite: 'grass_tile',
                constraints: {
                    top: ['grass', 'path'],
                    right: ['grass', 'path'],
                    bottom: ['grass', 'path'],
                    left: ['grass', 'path']
                }
            },
            {
                id: 'path',
                sprite: 'path_tile',
                constraints: {
                    top: ['path', 'grass'],
                    right: ['path', 'grass'],
                    bottom: ['path', 'grass'],
                    left: ['path', 'grass']
                }
            }
            // Add more tile definitions as needed
        ];
    }

    createMap(generatedMap) {
        // Create a container for all map tiles
        this.map = this.add.container(0, 0);

        // Render each tile
        for (let y = 0; y < generatedMap.length; y++) {
            for (let x = 0; x < generatedMap[y].length; x++) {
                const tile = generatedMap[y][x][0]; // Get the collapsed tile
                const sprite = this.add.sprite(
                    x * this.tileSize,
                    y * this.tileSize,
                    tile.sprite
                );
                sprite.setOrigin(0, 0);
                this.map.add(sprite);
            }
        }
    }

    createPlayer() {
        // Create player sprite
        this.player = this.add.sprite(400, 300, 'player');
        this.physics.add.existing(this.player);
        
        // Set up player physics
        this.player.body.setCollideWorldBounds(true);
        
        // Create animations
        this.createPlayerAnimations();
    }

    createPlayerAnimations() {
        // Create animations for each direction
        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('player', { frames: [4, 5, 6, 7] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('player', { frames: [8, 9, 10, 11] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('player', { frames: [12, 13, 14, 15] }),
            frameRate: 8,
            repeat: -1
        });

        // Idle animations
        this.anims.create({
            key: 'idle_down',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'idle_up',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'idle_left',
            frames: [{ key: 'player', frame: 8 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'idle_right',
            frames: [{ key: 'player', frame: 12 }],
            frameRate: 1
        });
    }

    update() {
        if (this.player) {
            this.handlePlayerMovement();
        }
    }

    handlePlayerMovement() {
        const speed = 160;
        const cursors = this.input.keyboard.createCursorKeys();
        
        // Reset velocity
        this.player.body.setVelocity(0);

        // Track if any movement key is pressed
        let moving = false;

        // Horizontal movement
        if (cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
            this.player.anims.play('walk_left', true);
            moving = true;
        } else if (cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
            this.player.anims.play('walk_right', true);
            moving = true;
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
            if (!moving) this.player.anims.play('walk_up', true);
            moving = true;
        } else if (cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
            if (!moving) this.player.anims.play('walk_down', true);
            moving = true;
        }

        // If not moving, play idle animation based on last direction
        if (!moving) {
            const currentAnim = this.player.anims.currentAnim;
            if (currentAnim) {
                const direction = currentAnim.key.split('_')[1];
                this.player.anims.play(`idle_${direction}`, true);
            }
        }

        // Normalize and scale the velocity so that player can't move faster diagonally
        this.player.body.velocity.normalize().scale(speed);
    }
}