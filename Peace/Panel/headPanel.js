import { Panel } from '../Base/panel.js';
import { ShGridItem } from '../Item/shGridItem.js';

export class HeadPanel extends Panel {
    constructor(frame) {
        super(frame.pos.x, frame.pos.y);

        this.aGridItems = [];
        this.aGridItems.push(new ShGridItem(this));
    }

    onDraw(context, frame) {        

        super.setPanelPos(frame.pos.x, frame.pos.y);
        super.setPanelWidth(frame.getPanelWidth());
        super.setPanelHeight(80);
        super.onDraw(context);

        let nGridItemsLenght = this.aGridItems.length;
        for(let i = 0; i < nGridItemsLenght; i++) {
            this.aGridItems[i].onDraw(context, this);
        }
    }
    onClick(mousePos) {
        let nGridItemsLength = this.aGridItems.length;
        for ( let i = nGridItemsLength - 1; i >= 0 ; i--) {
            const newItem = this.aGridItems[i].onClick(mousePos.clone());
            if(newItem !== null) {
                return newItem;
            }
        }
    }
} 