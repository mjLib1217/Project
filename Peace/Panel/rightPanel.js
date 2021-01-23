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

        this.tables = [];
    }

    onDraw(context) {
        
        super.onDraw(context);

        let nMainItemsLenght = this.aMainItems.length;
        for(let i = 0; i < nMainItemsLenght; i++) {
            this.aMainItems[i].onDraw(context, this);
        }

        let nTableSize = this.tables.length;
        let nCurTableHeight = this.aMainItems[0].getPos().y + this.aMainItems[0].getPanelItemHeight();
        for(let i = 0; i < nTableSize; i++) {
            this.tables[i].onDraw(context, this, nCurTableHeight);
            nCurTableHeight += this.tables[i].getPanelItemHeight() + 10;
        }
    }

    onDown(mousePos) {
        let nMainItemsLenght = this.aMainItems.length;
        for(let i = 0; i < nMainItemsLenght; i++) {
            const focusedItem = this.aMainItems[i].onDown(mousePos, this);
            if(focusedItem) {
                return focusedItem;
            }
        }

        let nTableSize = this.tables.length;
        for(let i = 0; i < nTableSize; i++) {
            const focusedItem = this.tables[i].onDown(mousePos);
            if(focusedItem) {
                return focusedItem;
            }
        }     
    }
}