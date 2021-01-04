import { Point } from "./point.js";
import { Navigation } from './navigation.js';

const START_X_POS   = 10;
const START_Y_POS   = 10;
// const REDUCE_WIDTH  = 20;
const REDUCE_HEIGHT = 970;
const LINE_WIDTH    = 5;
const HEADPANEL_LINE_COLOR = 'rgb(0, 0, 0)';

export class HeadPanel {
    constructor() {
        this.pos = new Point(START_X_POS, START_Y_POS);
        
        this.nav = new Navigation();
    }

    onDraw(context, nFrameWidth, nFrameHeight) {
        context.strokeStyle = HEADPANEL_LINE_COLOR;
        context.lineWidth = LINE_WIDTH;

        let nHeadPanelWidth     = nFrameWidth;
        let nHeadPanelHeight    = nFrameHeight - REDUCE_HEIGHT;

        context.strokeRect(this.pos.x, this.pos.y, nHeadPanelWidth, nHeadPanelHeight);

        this.nav.onDraw(context, nHeadPanelWidth, nHeadPanelHeight);
    }    
}