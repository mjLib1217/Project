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

        // super.setPanelWidth(frame.nPanelWidth);
        // super.setPanelHeight(frame.pos.y + 70);
        // super.onDraw(context);

        // let nMainItemsLenght = this.aMainItems.length;
        // for(let i = 0; i < nMainItemsLenght; i++) {
        //     this.aMainItems[i].onDraw(context, this);
        // }
    }
} 