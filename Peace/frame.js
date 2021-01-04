import { Point } from './point.js'

const START_X_POS   = 10;
const START_Y_POS   = 10;
const REDUCE_WIDTH  = 20;
const REDUCE_HEIGHT = 20;
const LINE_WIDTH    = 10;
const FRAME_LINE_COLOR = 'rgb(0, 0, 0)';

export class Frame {
    constructor() {
        this.pos = new Point(START_X_POS, START_Y_POS); // Frame 이 그려지는 시작 좌표
    }

    onDraw(context, stageWidth, stageHeight) {
        context.strokeStyle = FRAME_LINE_COLOR;
        context.lineWidth = LINE_WIDTH;
        context.strokeRect(this.pos.x, this.pos.y, stageWidth - REDUCE_WIDTH, stageHeight - REDUCE_HEIGHT);    
    }
}