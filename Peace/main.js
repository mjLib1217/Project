import { Frame } from './frame.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');        
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.frame = new Frame();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {

        this.stageWidth = window.innerWidth;
        this.stageHeight = window.innerHeight;
        
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.context.scale(this.pixelRatio, this.pixelRatio);
        
    }
    
    animate() {

        window.requestAnimationFrame(this.animate.bind(this));
        this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);
        
        this.frame.onDraw(this.context, this.stageWidth, this.stageHeight);
    }
}

window.onload = () => {
    new App();
};