import { Panel } from '../Base/panel.js';
import { ImportItem } from '../Item/importItem.js';
import { DetailItem } from '../Item/detailItem.js';

const RIGHTPANEL_WIDTH = 300;

export class RightPanel extends Panel {
    constructor(frame) {
        super(frame.getPos().x, frame.getPos().y);

        this.aMainItems = [];
        this.aMainItems.push(new ImportItem(this));
        this.aMainItems.push(new DetailItem(this));
    }

    onDraw(context, frame) {
        super.setPanelPos(frame.nPanelWidth - RIGHTPANEL_WIDTH, frame.pos.y);
        super.setPanelWidth(frame.pos.x + RIGHTPANEL_WIDTH);
        super.setPanelHeight(frame.nPanelHeight);
        super.onDraw(context);

        let nMainItemsLenght = this.aMainItems.length;
        for(let i = 0; i < nMainItemsLenght; i++) {
            this.aMainItems[i].onDraw(context, this);
        }
    }

    onClick(mousePos) {
        let nMainItemsLenght = this.aMainItems.length;
        for(let i = 0; i < nMainItemsLenght; i++) {
            this.aMainItems[i].onClick(mousePos);
        }
    }
}