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
        this.nStageWidth = window.innerWidth;;
        this.nStageHeight = window.innerHeight;
                
        // Controller
        this.frame = new Frame(this);

        // For Mouse Event
        this.mousePos = new Point();
        
        // Current Focus
        this.focus = null;

        this.bIsDown = false;
        
        // Event Listener
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
        
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }

    setFocus(focus) {
        this.focus = focus;
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
        
        if(this.focus) {
            if(this.focus.type == 'sheet') {
                this.focus.onDraw(this.context, this.frame.centerPanel);
            }
        }

        if(this.bIsDown) {
            this.context.save();
            if(this.focus.type == 'tableInfo_Item') {
                this.context.fillStyle = 'rgba(100, 100, 100, 0.5)';
                this.context.beginPath();
                this.context.fillText(this.focus.name, this.mousePos.x, this.mousePos.y);
                this.context.fill();
            } else if(this.focus.type == 'sheet') {
                if(this.focus.bActivate == false) {
                    this.context.strokeRect(this.mousePos.x, this.mousePos.y, 200, 200);
                    this.context.strokeRect(this.mousePos.x, this.mousePos.y, 200, 100);
                    this.context.strokeRect(this.mousePos.x, this.mousePos.y, 100, 200);
                    this.context.strokeRect(this.mousePos.x, this.mousePos.y, 100, 100);
                }
            } else {
                this.context.fillStyle = 'rgba(100, 100, 100, 0.5)';
                this.context.beginPath();
                this.context.arc(this.mousePos.x, this.mousePos.y, 10, 0, Math.PI * 2, false);
                this.context.fill();
            }
            this.context.restore();
        }

    }

    onDown(e) {
        console.log('Down');
        this.bIsDown = true;

        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;
        const focusItem = this.frame.onDown(this.mousePos.clone());

        this.focus = focusItem;
        
        console.log(focusItem);
        if(focusItem.type) {
            this.focus.type = focusItem.type;
        }
    }

    onMove(e) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;  

        if(this.focus !== null) {

            if(
                (this.focus.type == 'sheet' && this.focus.bActivate == false)
                || this.focus.type == 'tableInfo_Item'
                ) {
                // Inside CenterPanel
                if(this.mousePos.collide(this.frame.centerPanel.getPos(), this.frame.centerPanel.getPanelWidth(), this.frame.centerPanel.getPanelHeight())) {

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
                
            }            
        }
    }

    onUp(e) {
        console.log('Up');
        this.bIsDown = false;

        if(this.focus) {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
                    
            if(this.focus.type == 'sheet') {            
                if(this.focus.bActivate == false) {
                    this.focus.setGridPos(this.mousePos.x, this.mousePos.y);
                    this.focus.bActivate = true;
                    this.frame.centerPanel.sheetList.push(this.focus);
                }
            } else if(this.focus.type == 'tableInfo_Item') {
                
                if(this.mousePos.collide(this.frame.centerPanel.getPos(), this.frame.centerPanel.getPanelWidth(), this.frame.centerPanel.getPanelHeight())) {
                    let nSheetLen = this.frame.centerPanel.sheetList.length;
                    for(let i = 0; i < nSheetLen; i++) {
                        this.frame.centerPanel.sheetList[i].onUp(this.focus);              
                    }
                }
            }
        }
    }

    onKeyUp(e) {
        if(this.focus !== null) {
            if(this.focus.type && this.focus.type == 'sheet') {
                let key = String.fromCharCode(e.keyCode);
                console.log(this.focus);
                this.focus.onKeyUp(key);
            }
        }   
    }
}

window.onload = () => {
    new App();
};