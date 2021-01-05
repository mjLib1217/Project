import { NavItem } from './navItem.js'

export class TableNavItem extends NavItem{

    constructor(name, x, y) {
        super(name, x, y);
    }

    onDraw(context, index, nHeadPanelWidth, nHeadPanelHeight) {
        super.onDraw(context, index, nHeadPanelWidth, nHeadPanelHeight);
    }

    onClick(point) {
        if(point.collide(this.pos, super.getWidth(), super.getHeight())) {
            console.log('Click');
        }
    }
} 