import { Point } from "./Base/point.js";

export class SheetGrid {
    constructor() {
        this.pos = new Point();
        this.nItemWidth = 0;
        this.nItemHeight = 0;
        this.colNum = 0;
        this.rowNum = 0;
        this.bCreate = false;
        
        this.tmpKeyValues = [];

    }

    onDraw(context) {       
        
        if(this.colNum == 0 || this.rowNum == 0) {
            
            context.strokeStyle = 'rgb(0, 0, 0)';
            context.lineWidth = 5;
            this.nItemHeight = 120;
            this.nItemWidth = 340;
            context.strokeRect(this.pos.x, this.pos.y, this.nItemWidth, this.nItemHeight);

            context.fillText('행과 열을 입력하세요',this.pos.x + 30, this.pos.y + 35);
            context.fillText('\n',this.pos.x + 30, this.pos.y + 60);
            context.fillText('행 : [' + this.rowNum + '] 열 : [' + this.colNum +']',this.pos.x + 30, this.pos.y + 90);
        } else {
            context.strokeStyle = 'rgb(0, 0, 0)';
            context.lineWidth = 5;
            let nColWidth = 100;
            let nRowHeight = 50;
            let nTotlaWidth = 0;
            let nTotalHeight = 0;
            for(let i = 0; i < this.colNum; i++) {
                for(let j = 0; j < this.rowNum; j++) {
                    context.strokeRect(this.pos.x + (i * nColWidth), this.pos.y + (j * nRowHeight), nColWidth, nRowHeight);
                    nTotalHeight += this.pos.x + (i * nRowHeight);
                    nTotlaWidth += this.pos.y + (j * nColWidth);
                }
            }
            this.nItemHeight = nTotalHeight;
            this.nItemWidth = nTotlaWidth;
        }
    }

    onClick(mousePoint) {
        if(!mousePoint.collide(this.pos, this.nItemWidth, this.nItemHeight)) {
            return;
        }

        console.log('Click Show Item');
    }

    onKeyUp(key) {
        if(this.rowNum == 0) {
            this.rowNum = key;
        } else if(this.colNum == 0) {
            this.colNum = key;
        }
    }
} 