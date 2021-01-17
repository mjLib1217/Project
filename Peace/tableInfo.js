import { PanelItem } from "./Base/panelItem.js";

export class  TableInfo extends PanelItem {
    constructor(importItem) {
        super(importItem.getPos().x, importItem.getPos().y);    
        this.Id = '';
        this.cols = [];
    }

    onDraw(context, importItem, nCurTableHeight) { 
        super.setPanelItemPos(importItem.getPos().x, importItem.getPos().y + nCurTableHeight);
        super.setPanelItemWidth(290);

        let nTotalHeight = 30;
        super.setPanelItemHeight(( nTotalHeight ));
        // id
        context.strokeRect(super.getPos().x, super.getPos().y, super.getPanelItemWidth(), super.getPanelItemHeight());
        
        context.save();
        context.font = 'bold 18px Cursive';
        context.textAlign = 'center';
        context.fillText(this.Id, super.getPos().x + 140, super.getPos().y + 23);
        context.restore();

        // cols
        let nColsLength = this.cols.length;
        if(nColsLength > 0) {
            for(let i = 0; i < nColsLength; i++ ) {
                this.cols[i].onDraw(context, this, i);
                nTotalHeight += 30;
            }
        }

        super.setPanelItemHeight(( nTotalHeight ));
    }
} 