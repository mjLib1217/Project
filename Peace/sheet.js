import { Grid } from "./Base/grid.js";

export class SheetGrid extends Grid {
    constructor(mousePos) {
        super(mousePos.x, mousePos.y);
        this.type = 'sheet';
        this.colNum = 0;
        this.rowNum = 0;
        this.bActivate = false;
        this.tmpKeyValues = [];

    }

    onDraw(context, centerPanel) {
        super.setGridPos(super.getPos().x, super.getPos().y);

        if(this.bActivate == false) {
            context.strokeRect(super.getPos().x, super.getPos().y, 200, 200);
            context.strokeRect(super.getPos().x, super.getPos().y, 200, 100);
            context.strokeRect(super.getPos().x, super.getPos().y, 100, 200);
            context.strokeRect(super.getPos().x, super.getPos().y, 100, 100);
        } else {
            if(this.colNum == 0 || this.rowNum == 0) {
                super.setGridWidth(340);
                super.setGridHeight(120);
    
                context.fillText('행과 열을 입력하세요',super.getPos().x + 30, super.getPos().y + 35);
                context.fillText('\n',super.getPos().x + 30, super.getPos().y + 60);
                context.fillText('행 : [' + this.rowNum + '] 열 : [' + this.colNum +']',this.pos.x + 30, this.pos.y + 90);
            } else {
                let nColWidth = 100;
                let nRowHeight = 50;
                let nTotlaWidth = 0; 
                let nTotalHeight = 0;
                for(let i = 0; i < this.colNum; i++) {
                    for(let j = 0; j < this.rowNum; j++) {
                        context.strokeRect(super.getPos().x + (i * nColWidth), super.getPos().y + (j * nRowHeight), nColWidth, nRowHeight);
                        nTotalHeight += super.getPos().x + (i * nRowHeight);
                        nTotlaWidth += super.getPos().y + (j * nColWidth);
                    }
                }
        
                super.setGridWidth(nTotalHeight);
                super.setGridHeight(nTotlaWidth);
            }
        }
    }

    onClick(mousePoint) {
        if(!mousePoint.collide(mousePoint, super.x, super.y)) {
            return null;
        } else {
            return this;
        }
    }

    onMove(mousePos) {
        super.setGridPos(mousePos.x, mousePos.y);
    }

    onUp(mousePos) {
        super.setGridPos(mousePos.x, mousePos.y);
    }

    onKeyUp(key) {
        if(this.rowNum == 0) {
            this.rowNum = key;
        } else if(this.colNum == 0) {
            this.colNum = key;
        }
    }


    getType() {
        return this.type;
    }
} 