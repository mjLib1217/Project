import { Point } from "../Base/point.js";

export class ShowItem {
    constructor() {
        this.pos = new Point();
        this.nItemWidth = 0;
        this.nItemHeight = 0;
        
    }

    onDraw(context, frame) {
        this.pos.x = frame.importItem.pos.x + frame.importItem.nItemWidth;
        this.pos.y = frame.importItem.pos.y
        this.nItemWidth = ( frame.nRightPanelWidth - 20 ) / 2;
        this.nItemHeight = frame.nFrameHeight / 14;
        
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.lineWidth = 5;
        context.strokeRect(this.pos.x, this.pos.y, this.nItemWidth, this.nItemHeight);
        context.font = '30px serif';
        context.fillText('Show', this.pos.x + 15, this.pos.y + 37);
    }

    onClick(mousePoint) {
        if(!mousePoint.collide(this.pos, this.nItemWidth, this.nItemHeight)) {
            return;
        }

        console.log('Click Show Item');
    }
} 