import { Point } from "./point.js";

const START_X_POS   = 20;
const START_Y_POS   = 20;

const ITEM_WIDTH    = 80;
const ITEM_HEIGHT   = 30;

const LINE_WIDTH    = 2;
const ITEM_LINE_COLOR = 'rgb(20, 20, 20)';

const ITEM_FONT_COLOR = 'rgb(0, 0, 0)';
const ITEM_FONT_SIZE = '24px';
const ITEM_FONT_STYLE = 'serif';

export class NavItem {
    constructor(name, x, y) {
        this.pos = new Point(x, y);
        this.name = name;
    }

    onDraw(context, index, nHeadPanelWidth, nHeadPanelHeight) {
        context.strokeStyle = ITEM_LINE_COLOR;
        context.lineWidth = LINE_WIDTH;

        context.strokeRect(this.pos.x, this.pos.x, ITEM_WIDTH, ITEM_HEIGHT);    

        context.font = ITEM_FONT_SIZE + ' ' + ITEM_FONT_STYLE;
        context.fillText(this.name, this.pos.x + 10, this.pos.y + 25);
    }

    getWidth() {
        return ITEM_WIDTH;
    }

    getHeight() {
        return ITEM_HEIGHT;
    }
} 