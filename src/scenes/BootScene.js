export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load character sprites
        this.load.spritesheet('character', 'assets/ASEPRITE/UNARMED_IDLE.png', {
            frameWidth: 48,  // Adjust based on actual sprite size
            frameHeight: 48  // Adjust based on actual sprite size
        });

        this.load.spritesheet('character_run', 'assets/ASEPRITE/UNARMED_RUN.png', {
            frameWidth: 48,  // Adjust based on actual sprite size
            frameHeight: 48  // Adjust based on actual sprite size
        });

        // Add loading progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            this.scene.start('MainScene');
        });
    }
}