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
        this.player = this.add.sprite(400, 300, 'unarmed_idle');
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.createPlayerAnimations();
        
        // Set initial animation
        this.player.anims.play('idle_down');
    }

    createPlayerAnimations() {
        // Idle animations
        this.anims.create({
            key: 'idle_down',
            frames: this.anims.generateFrameNumbers('unarmed_idle', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_up',
            frames: this.anims.generateFrameNumbers('unarmed_idle', { start: 6, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNumbers('unarmed_idle', { start: 12, end: 17 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNumbers('unarmed_idle', { start: 18, end: 23 }),
            frameRate: 8,
            repeat: -1
        });

        // Walking animations
        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('unarmed_walk', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('unarmed_walk', { start: 6, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('unarmed_walk', { start: 12, end: 17 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('unarmed_walk', { start: 18, end: 23 }),
            frameRate: 8,
            repeat: -1
        });

        // Running animations
        this.anims.create({
            key: 'run_down',
            frames: this.anims.generateFrameNumbers('unarmed_run', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run_up',
            frames: this.anims.generateFrameNumbers('unarmed_run', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNumbers('unarmed_run', { start: 12, end: 17 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNumbers('unarmed_run', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        if (this.player) {
            this.handlePlayerMovement();
        }
    }

    handlePlayerMovement() {
        const speed = 160;
        const runSpeed = speed * 1.5;
        const cursors = this.input.keyboard.createCursorKeys();
        
        // Reset velocity
        this.player.body.setVelocity(0);

        // Track if any movement key is pressed
        let moving = false;
        const isRunning = cursors.shift.isDown;
        const currentSpeed = isRunning ? runSpeed : speed;

        // Horizontal movement
        if (cursors.left.isDown) {
            this.player.body.setVelocityX(-currentSpeed);
            this.player.anims.play(isRunning ? 'run_left' : 'walk_left', true);
            moving = true;
        } else if (cursors.right.isDown) {
            this.player.body.setVelocityX(currentSpeed);
            this.player.anims.play(isRunning ? 'run_right' : 'walk_right', true);
            moving = true;
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.player.body.setVelocityY(-currentSpeed);
            if (!moving) this.player.anims.play(isRunning ? 'run_up' : 'walk_up', true);
            moving = true;
        } else if (cursors.down.isDown) {
            this.player.body.setVelocityY(currentSpeed);
            if (!moving) this.player.anims.play(isRunning ? 'run_down' : 'walk_down', true);
            moving = true;
        }

        // If not moving, play idle animation
        if (!moving) {
            const currentAnim = this.player.anims.currentAnim;
            if (currentAnim) {
                const direction = currentAnim.key.split('_')[1];
                this.player.anims.play(`idle_${direction}`, true);
            }
        }

        // Normalize and scale the velocity
        this.player.body.velocity.normalize().scale(currentSpeed);
    }
}