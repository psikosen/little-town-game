export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.tileSize = 48;
    }

    create() {
        // Create player
        this.createPlayer();
        
        // Set up camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 800, 600);
    }

    createPlayer() {
        this.player = this.add.sprite(400, 300, 'character');
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.createPlayerAnimations();
    }

    createPlayerAnimations() {
        // Idle animations for all directions
        this.anims.create({
            key: 'idle_down',
            frames: this.anims.generateFrameNumbers('character', { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_up',
            frames: this.anims.generateFrameNumbers('character', { frames: [6, 7, 8, 9, 10, 11] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNumbers('character', { frames: [12, 13, 14, 15, 16, 17] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNumbers('character', { frames: [18, 19, 20, 21, 22, 23] }),
            frameRate: 8,
            repeat: -1
        });

        // Running animations
        this.anims.create({
            key: 'run_down',
            frames: this.anims.generateFrameNumbers('character_run', { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run_up',
            frames: this.anims.generateFrameNumbers('character_run', { frames: [6, 7, 8, 9, 10, 11] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNumbers('character_run', { frames: [12, 13, 14, 15, 16, 17] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNumbers('character_run', { frames: [18, 19, 20, 21, 22, 23] }),
            frameRate: 10,
            repeat: -1
        });

        // Set initial animation
        this.player.anims.play('idle_down', true);
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
            this.player.anims.play('run_left', true);
            moving = true;
        } else if (cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
            this.player.anims.play('run_right', true);
            moving = true;
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
            if (!moving) this.player.anims.play('run_up', true);
            moving = true;
        } else if (cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
            if (!moving) this.player.anims.play('run_down', true);
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

        // Normalize and scale the velocity
        this.player.body.velocity.normalize().scale(speed);
    }
}