export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.map = null;
    }

    create() {
        // Initialize WFC
        const wfc = new WaveFunctionCollapse(20, 20, []); // We'll add tile definitions later
        wfc.initialize();
        const generatedMap = wfc.collapse();

        // Create player
        this.createPlayer();
        
        // Set up camera
        this.cameras.main.startFollow(this.player);
    }

    createPlayer() {
        // We'll implement this once you add the character assets
        this.player = this.add.sprite(400, 300, 'player');
        this.physics.add.existing(this.player);
    }

    update() {
        // Handle player movement
        if (this.player) {
            this.handlePlayerMovement();
        }
    }

    handlePlayerMovement() {
        const speed = 160;
        const cursors = this.input.keyboard.createCursorKeys();
        
        // Reset velocity
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster diagonally
        this.player.body.velocity.normalize().scale(speed);
    }
}