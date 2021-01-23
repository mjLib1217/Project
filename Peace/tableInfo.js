import { PanelItem } from "./Base/panelItem.js";

let curFocusItem = function() {
    this.bIsFocus = false;

}

export class  TableInfo extends PanelItem {
    constructor(importItem) {
        super(importItem.getPos().x, importItem.getPos().y);    
        this.Id = '';
        this.cols = [];
        
        this.type = 'tableInfo';
        this.focus = new curFocusItem();
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

        context.save();
        context.fillStyle = 'rgba(200, 0, 0, 0.5)';
        context.fillRect(super.getPos().x, super.getPos().y, super.getPanelItemWidth(), 30);
        context.restore();

        if(this.focus.bIsFocus) {
            console.log('focus');
            console.log(this.focus.pos);
            context.save();
            context.fillStyle = 'rgba(0, 200, 0, 0.5)';
            context.fillRect(this.focus.pos.x, this.focus.pos.y, super.getPanelItemWidth(), 30);
            context.restore();
            //this.focus.bIsFocus = false;
        }
    }

    onDown(mousePoint) {
        if(mousePoint.collide(super.getPos(), super.getPanelItemWidth(), 30)) {
            this.focus.bIsFocus = true;
            curFocusItem.prototype.pos = mousePoint;
            return this;
        } else if (mousePoint.collide(mousePoint, super.getPanelItemWidth(), super.getPanelItemHeight() - 30)) {
            let nColLen = this.cols.length;
            for(let i = 0; i < nColLen; i++) {
                const newItem = this.cols[i].onDown(mousePoint);              
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