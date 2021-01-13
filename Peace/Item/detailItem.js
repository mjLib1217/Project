import { PanelItem } from "../Base/panelItem.js";

export class DetailItem extends PanelItem{
    constructor(rightPanel) {
        super(rightPanel.pos.x, rightPanel.pos.y);     
    }

    onDraw(context, rightPanel) {
        super.setPanelItemPos(rightPanel.aMainItems[0].getPos().x + rightPanel.aMainItems[0].getPanelItemWidth(), rightPanel.aMainItems[0].getPos().y);
        super.setPanelItemWidth(( rightPanel.nPanelWidth - 20 ) / 2);
        super.setPanelItemHeight(rightPanel.nPanelHeight / 12);
        super.onDraw(context);
        
        context.font = '30px Cursive';
        context.fillText('Detail', super.getPos().x + 20, super.getPos().y + 40);
    }

    onClick(mousePoint) {
        if(!mousePoint.collide(this.pos, this.nItemWidth, this.nItemHeight)) {
            return;
        }

        console.log('Click Show Item');
    }
} 