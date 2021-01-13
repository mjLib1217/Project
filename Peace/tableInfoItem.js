import { PanelItem } from "../Base/panelItem.js";

export class TableInfoItem extends PanelItem  {
    constructor(tableInfo) {
        super(tableInfo.getPos().x, tableInfo.getPos().y);  
        this.name = '';
        this.type = '';
        this.condition = [];
    }

    onDraw(context, tableInfo, nListIndex) {
        super.setPanelItemPos(tableInfo.getPos().x, tableInfo.getPos().y + ( nListIndex + 1 ) * 30);
        super.setPanelItemWidth(tableInfo.getPanelItemWidth());
        super.setPanelItemHeight(30);
        super.onDraw(context);

        context.save();
        context.font = '18px Cursive';
        context.textAlign = 'center';
        context.fillText(this.name, super.getPos().x + 140, super.getPos().y + 23);
        context.restore();
    }

    onClick(mousePoint) {
        if(!mousePoint.collide(this.pos, this.nItemWidth, this.nItemHeight)) {
            return;
        }

        console.log('Click Show Item');
    }
} 