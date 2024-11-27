export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.tileSize = 48;
    }

    create() {
        console.log('Creating main scene...');
        // Create player
        this.createPlayer();
        
        // Set up camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 800, 600);
    }

    createPlayer() {
        console.log('Creating player sprite...');
        this.player = this.add.sprite(400, 300, 'character');
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.createPlayerAnimations();
        
        // Set default animation
        this.player.anims.play('idle_down');
    }

    createPlayerAnimations() {
        console.log('Setting up animations...');
        
        // Idle animations - just using single frame for now
        this.anims.create({
            key: 'idle_down',
            frames: [{ key: 'character', frame: 0 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'idle_up',
            frames: [{ key: 'character', frame: 1 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'idle_left',
            frames: [{ key: 'character', frame: 2 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'idle_right',
            frames: [{ key: 'character', frame: 3 }],
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
            this.player.anims.play('idle_left', true);
            moving = true;
        } else if (cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
            this.player.anims.play('idle_right', true);
            moving = true;
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
            if (!moving) this.player.anims.play('idle_up', true);
            moving = true;
        } else if (cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
            if (!moving) this.player.anims.play('idle_down', true);
            moving = true;
        }

        // Normalize and scale the velocity
        this.player.body.velocity.normalize().scale(speed);
    }
}