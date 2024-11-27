export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load character sprites with debug logging
        console.log('Loading sprites...');
        
        this.load.spritesheet('character', '/assets/ASEPRITE/Character_001.png', {
            frameWidth: 48,
            frameHeight: 48
        });

        this.load.on('filecomplete', (key) => {
            console.log('Loaded:', key);
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
            console.log('Loading progress:', value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('complete', () => {
            console.log('Loading complete!');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            this.scene.start('MainScene');
        });
    }
}