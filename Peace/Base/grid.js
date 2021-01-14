import { Point } from "./point.js";


export class Grid {
    constructor(xPos, yPos) {
        this.pos = new Point(xPos, yPos);
        this.nGridWidth = 0;
        this.nGridHeight = 0;
    }

    onDraw(context) {        
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.lineWidth = 3;
        context.strokeRect(this.pos.x, this.pos.y, this.nGridWidth, this.nGridHeight);
    }

    setGridPos(xPos, yPos) {
        this.pos.x = xPos;
        this.pos.y = yPos;
    }

    setGridWidth(nWidth) {
        this.nGridWidth = nWidth;
    }

    setGridHeight(nHeight) {
        this.nGridHeight = nHeight;
    }

    getGridWidth() {
        return this.nGridWidth;
    }

    getGridHeight() {
        return this.nGridHeight;
    }
    
    getPos() {
        return this.pos;
    }
} 