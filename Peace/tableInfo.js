import { PanelItem } from "./Base/panelItem.js";

export class  TableInfo extends PanelItem {
    constructor(importItem) {
        super(importItem.getPos().x, importItem.getPos().y);    
        this.Id = '';
        this.itemList = [];
        
        this.type = 'tableInfo';
    }

    onDraw(context, importItem, nCurTableHeight) { 
        super.setPanelItemPos(importItem.getPos().x, importItem.getPos().y + nCurTableHeight);
        super.setPanelItemWidth(290);

        let nTotalHeight = 0;

        // cols
        let nItemListLen = this.itemList.length;
        if(nItemListLen > 0) {
            for(let i = 0; i < nItemListLen; i++ ) {
                this.itemList[i].onDraw(context, this, i);
                nTotalHeight += 30;
            }
        }

        super.setPanelItemHeight(( nTotalHeight ));

        context.save();
        context.fillStyle = 'rgba(200, 0, 0, 0.5)';
        context.fillRect(super.getPos().x, super.getPos().y, super.getPanelItemWidth(), 30);
        context.strokeRect(super.getPos().x, super.getPos().y, super.getPanelItemWidth(), 30);
        context.restore();
    }

    onDown(mousePoint) {
        if(mousePoint.collide(super.getPos(), super.getPanelItemWidth(), super.getPanelItemHeight())) {
            
            let nColLen = this.itemList.length;
            for(let i = 0; i < nColLen; i++) {
                const newItem = this.itemList[i].onDown(mousePoint);              
                if(newItem) {
                    console.log(newItem);
                    return newItem;
                }
            }

        } else {
            this.focus.bIsFocus = false;
        }
    }
} 