import { Point } from './point.js'
import { HeadPanel } from './headPanel.js'

const START_X_POS   = 10;
const START_Y_POS   = 10;
const REDUCE_WIDTH  = 20;
const REDUCE_HEIGHT = 20;
const LINE_WIDTH    = 5;
const FRAME_LINE_COLOR = 'rgb(0, 0, 0)';

export class Frame {
    constructor() {
        this.pos = new Point(START_X_POS, START_Y_POS); // Frame 이 그려지는 시작 좌표
        
        this.headPanel = new HeadPanel();
    }

    onDraw(context, stageWidth, stageHeight) {
        context.strokeStyle = FRAME_LINE_COLOR;
        context.lineWidth = LINE_WIDTH;

        let nFrameWidth = stageWidth - REDUCE_WIDTH;
        let nFrameHeight = stageHeight - REDUCE_HEIGHT;

        context.strokeRect(this.pos.x, this.pos.y, nFrameWidth, nFrameHeight);

        this.headPanel.onDraw(context, nFrameWidth, nFrameHeight);
    }
}