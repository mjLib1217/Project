import { Frame } from './frame.js';
import { Point } from './point.js';

class App {

    constructor() {

        this.canvas = document.createElement('canvas');        
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        
        this.frame = new Frame();

        this.mousePos = new Point();
        
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        this.nStageWidth = 0;
        this.nStageHeight = 0;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

        document.addEventListener('click', this.onClick.bind(this), false);

    }

    resize() {

        this.nStageWidth = window.innerWidth;
        this.nStageHeight = window.innerHeight;
        
        this.canvas.width = this.nStageWidth * this.pixelRatio;
        this.canvas.height = this.nStageHeight * this.pixelRatio;

        this.context.scale(this.pixelRatio, this.pixelRatio);

    }
    
    animate() {

        window.requestAnimationFrame(this.animate.bind(this));

        this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.frame.onDraw(this.context, this.nStageWidth, this.nStageHeight);
        
    }

    onClick(e) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;
        
        let nMainItemsLength = this.frame.aMainItems.length;

        for ( let i = nMainItemsLength - 1; i >= 0 ; i--) {
            this.frame.aMainItems[i].onClick(this.mousePos.clone());
        }
    }
}

window.onload = () => {
    new App();
};