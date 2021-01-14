import { Frame } from './frame.js';
import { Point } from './Base/point.js';

class App {

    constructor() {

        // Pixel Setting
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        // Canvas For Painting
        this.canvas = document.createElement('canvas');        
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
      
        // Canvas Width Height
        this.nStageWidth = 0;
        this.nStageHeight = 0;
                
        // Controller
        this.frame = new Frame();

        // For Mouse Event
        this.mousePos = new Point();
        
        // Event Listener
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

        document.addEventListener('click', this.onClick.bind(this), false);
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);
        this.focus = null;
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

        this.context.clearRect(0, 0, this.nStageWidth, this.nStageHeight);
        this.frame.onDraw(this.context,  this.nStageWidth, this.nStageHeight);
        

    }

    onClick(e) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;
        this.focus = this.frame.onClick(this.mousePos.clone());
    }

    onDown(e) {
        if(this.focus !== null) {

            console.log('Down');

            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;

        }
    }

    onMove(e) {
        if(this.focus !== null) {
            console.log('Move');
            console.log(this.focus);
            if (this.focus.type == 'sheet') {
                if(this.focus.bActive == false) {
                    this.mousePos.x = e.clientX;
                    this.mousePos.y = e.clientY;
                    this.focus.onMove(this.mousePos);
                }
            }
        }
    }

    onUp(e) {
        if(this.focus !== null) {
            console.log('Up');
            if (this.focus.type == 'sheet') {
                if(this.focus.bActive == false) {
                    this.mousePos.x = e.clientX;
                    this.mousePos.y = e.clientY;
                    this.focus.onUp(this.mousePos);
                    this.focus = null;
                }
            }
        }
    }
}

window.onload = () => {
    new App();
};