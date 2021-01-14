import { PanelItem } from "../Base/panelItem.js";
import { SheetGrid } from "../sheet.js";

export class ShGridItem extends PanelItem{
    constructor(headPanel) {
        super(headPanel.pos.x, headPanel.pos.y);  
    }

    onDraw(context, headPanel) {
 
        super.setPanelItemPos(headPanel.getPos().x + 10, headPanel.getPos().y + 10);
        super.setPanelItemWidth(130);
        super.setPanelItemHeight(57);
        super.onDraw(context);
        
        context.font = '30px Cursive';
        context.fillText('ShGrid', super.getPos().x + 10, super.getPos().y + 40);
    }

    onClick(mousePoint) {
        if(!mousePoint.collide(mousePoint, super.getPanelItemWidth(), super.getPanelItemHeight())) {
            return null;
        } else {
            return new SheetGrid(mousePoint);
        }        
    }

    onDown(context, mousePos) {
        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        context.strokeRect(mousePos.x, mousePos.y, 400, 300);
    }

    onMove(context, mousePos) {
        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        context.strokeRect(mousePos.x, mousePos.y, 200, 200);
        context.strokeRect(mousePos.x, mousePos.y, 200, 100);
        context.strokeRect(mousePos.x, mousePos.y, 100, 200);
        context.strokeRect(mousePos.x, mousePos.y, 100, 100);
    }
} 