import { PanelItem } from "./Base/panelItem.js";

export class TableInfoItem extends PanelItem  {
    constructor(tableInfo) {
        super(tableInfo.getPos().x, tableInfo.getPos().y);  
        this.name = '';
        this.condition = [];

        this.type = 'tableInfo_Item';
    }

    onDraw(context, tableInfo, nListIndex) {
        super.setPanelItemPos(tableInfo.getPos().x, tableInfo.getPos().y + ( nListIndex ) * 30);
        super.setPanelItemWidth(tableInfo.getPanelItemWidth());
        super.setPanelItemHeight(30);
        super.onDraw(context);

        context.save();
        context.font = '18px Cursive';
        context.textAlign = 'center';
        context.fillText(this.name, super.getPos().x + 140, super.getPos().y + 23);
        context.restore();
    }

    onDown(mousePoint) {
        if(mousePoint.collide(super.getPos(), super.getPanelItemWidth(), super.getPanelItemHeight())) {
            console.log(mousePoint);
            console.log(super.getPos());
            console.log(this);
            return this;
        }
    }
} 