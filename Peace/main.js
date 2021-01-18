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
        
        // Current Focus
        this.focus = null;

        // Event Listener
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

        document.addEventListener('click', this.onClick.bind(this), false);
        // document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        // document.addEventListener('pointerup', this.onUp.bind(this), false);
        
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
        
        if(this.focus !== null) {
            this.focus.onDraw(this.context, this.frame.centerPanel);
        }
    }

    onClick(e) {
        console.log('clic');
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;
        if(this.focus === null) {
            this.focus = this.frame.onClick(this.mousePos.clone());
        } else {
            this.focus = null;
        }
        
        console.log(this.focus);
    }

    onMove(e) {
        if(this.focus !== null) {

            // Inside CenterPanel
            if(this.mousePos.collide(this.frame.centerPanel.getPos(), this.frame.centerPanel.getPanelWidth(), this.frame.centerPanel.getPanelHeight())) {
                console.log('collide');
                this.mousePos.x = e.clientX;
                this.mousePos.y = e.clientY;                
            }

            // Outside CenterPanel
            if(this.mousePos.x < this.frame.centerPanel.getPos().x) {
                this.mousePos.x = this.frame.centerPanel.getPos().x;
            } else if (this.mousePos.x > this.frame.centerPanel.getPos().x + this.frame.centerPanel.getPanelWidth() - 200 /** TABLE WIDTH */) {
                this.mousePos.x = this.frame.centerPanel.getPos().x + this.frame.centerPanel.getPanelWidth() - 200 ;
            }

            if(this.mousePos.y < this.frame.centerPanel.getPos().y) {
                this.mousePos.y = this.frame.centerPanel.getPos().y;
            } else if (this.mousePos.y > this.frame.centerPanel.getPos().y + this.frame.centerPanel.getPanelHeight() - 200 /** TABLE HEIGHT */) {
                this.mousePos.y = this.frame.centerPanel.getPos().y + this.frame.centerPanel.getPanelHeight() - 200;
            }

            this.focus.onMove(this.mousePos);
        }
    }
}

window.onload = () => {
    new App();
};