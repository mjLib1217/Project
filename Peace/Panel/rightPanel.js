import { Panel } from '../Base/panel.js';
import { ImportItem } from '../Item/importItem.js';
import { DetailItem } from '../Item/detailItem.js';

const RIGHTPANEL_WIDTH = 300;

export class RightPanel extends Panel {
    constructor(frame) {
        super(frame.getPos().x + frame.headPanel.getPanelWidth(), frame.getPos().y);
        super.setPanelWidth(RIGHTPANEL_WIDTH);
        super.setPanelHeight(frame.getPanelHeight());
        
        this.aMainItems = [];
        this.aMainItems.push(new ImportItem(this));
        this.aMainItems.push(new DetailItem(this));
    }

    onDraw(context) {
        
        super.onDraw(context);

        let nMainItemsLenght = this.aMainItems.length;
        for(let i = 0; i < nMainItemsLenght; i++) {
            this.aMainItems[i].onDraw(context, this);
        }
    }

    onDown(mousePos) {
        let nMainItemsLenght = this.aMainItems.length;
        for(let i = 0; i < nMainItemsLenght; i++) {
            this.aMainItems[i].onDown(mousePos);
        }
    }
}