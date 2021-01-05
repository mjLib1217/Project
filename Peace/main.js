import { Frame } from './frame.js';
import { Point } from './point.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');        
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.frame = new Frame();
        this.mousePos = new Point();
        this.curItem = null;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

        document.addEventListener('click', this.onClick.bind(this), false);
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

    onClick(e) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;
        
        for ( let i = this.frame.headPanel.nav.items.length - 1; i >= 0 ; i--) {
            const item = this.frame.headPanel.nav.items[i].onClick(this.mousePos.clone());
            // if(item) {
            //     this.curItem = item;
            //     const index = this.items.indexOf(item);
            //     this.items.push(this.items.splice(index, 1)[0]);
            //     break;
            // }
        }
    }
}

window.onload = () => {
    new App();
};