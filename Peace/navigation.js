import { Point } from './point.js';
import { TableNavItem } from './tableNavItem.js';

const START_X_POS       = 10;
const START_Y_POS       = 10;
// const NAV_WIDTH      = 80;
// const NAV_HEIGHT     = 30;
const LINE_WIDTH        = 2;
const NAV_LINE_COLOR    = 'rgb(0, 0, 0)';

const ITEM_TABLE_X_POS  = 20;
const ITEM_TABLE_Y_POS  = 20;

export class Navigation {
    constructor() {
        this.pos = new Point(START_X_POS, START_Y_POS);
        this.items = [];

        this.items.push(new TableNavItem('Table', ITEM_TABLE_X_POS, ITEM_TABLE_Y_POS));
    }

    onDraw(context, nHeadPanelWidth, nHeadPanelHeight) {
        context.strokeStyle = NAV_LINE_COLOR;
        context.lineWidth = LINE_WIDTH;
        
        for(let i = 0; i < this.items.length; i++) {
            this.items[i].onDraw(context, i, nHeadPanelWidth, nHeadPanelHeight);
        }
    }    
} 