export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // We'll load the assets here once you add them
        this.load.on('complete', () => {
            this.scene.start('MainScene');
        });
    }
}