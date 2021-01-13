import { Point } from "./point.js";


export class Panel {
    constructor(xPos, yPos) {
        this.pos = new Point(xPos, yPos);
        this.nPanelWidth = 0;
        this.nPanelHeight = 0;
    }

    onDraw(context) {        
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.lineWidth = 3;
        context.strokeRect(this.pos.x, this.pos.y, this.nPanelWidth, this.nPanelHeight);
    }

    setPanelPos(xPos, yPos) {
        this.pos.x = xPos;
        this.pos.y = yPos;
    }

    setPanelWidth(nWidth) {
        this.nPanelWidth = nWidth;
    }

    setPanelHeight(nHeight) {
        this.nPanelHeight = nHeight;
    }

    getPanelWidth() {
        return this.nPanelWidth;
    }

    getPanelHeight() {
        return this.nPanelHeight;
    }
    
    getPos() {
        return this.pos;
    }
} 