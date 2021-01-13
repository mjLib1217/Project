import { Point } from "./point.js";


export class PanelItem {
    constructor(xPos, yPos) {
        this.pos = new Point(xPos, yPos);
        this.nPanelItemWidth = 0;
        this.nPanelItemHeight = 0;
    }

    onDraw(context) {        
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.lineWidth = 3;
        context.strokeRect(this.pos.x, this.pos.y, this.nPanelItemWidth, this.nPanelItemHeight);
    }

    setPanelItemPos(xPos, yPos) {
        this.pos.x = xPos;
        this.pos.y = yPos;
    }

    setPanelItemWidth(nWidth) {
        this.nPanelItemWidth = nWidth;
    }

    setPanelItemHeight(nHeight) {
        this.nPanelItemHeight = nHeight;
    }

    getPos() {
        return this.pos;
    }

    getPanelItemWidth() {
        return this.nPanelItemWidth;
    }

    getPanelItemHeight() {
        return this.nPanelItemHeight;
    }
} 