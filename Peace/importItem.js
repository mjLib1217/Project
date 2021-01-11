import { Point } from "./point.js";

export class ImportItem {
    constructor() {
        this.pos = new Point();
        this.nItemWidth = 0;
        this.nItemHeight = 0;
        
        this.tables = [];
    }

    onDraw(context, frame) {
        this.pos.x = frame.nRightPanelStartXPos + 10;
        this.pos.y = frame.nRightPanelStartYPos + 10;
        this.nItemWidth = ( frame.nRightPanelWidth - 20 ) / 2;
        this.nItemHeight = frame.nFrameHeight / 12;
        
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.lineWidth = 5;
        context.strokeRect(this.pos.x, this.pos.y, this.nItemWidth, this.nItemHeight);
        context.font = '30px serif';
        context.fillText('Import', this.pos.x + 15, this.pos.y + 37);
    }

    onClick(mousePoint) {
        if(!mousePoint.collide(this.pos, this.nItemWidth, this.nItemHeight)) {
            return;
        }

        console.log('Click Import Item');

        const file = document.createElement('input');
        file.type = 'file';

        file.onchange = evt => {

            const uploadFile = evt.target.files[0];
            const reader = new FileReader();

            reader.readAsText(uploadFile, 'UTF-8');
            reader.onload = readerEvt => {

                let content = readerEvt.target.result;
                content = content.replaceAll(' ', '');
                content = content.replaceAll('\r\n', '');
                content = content.replaceAll('\n', '');
                content = content.replaceAll('\t', '');

                let curTable = new Object();
                curTable.cols = [];
                
                let aColInfos = null;

                const sCreateRegex = /CREATETABLE(\w+)\(((?:.+)(?=(?:,CONSTRAINT))),((?:.+))\);/;
                {
                    let matchedKeywords = content.match(sCreateRegex);
                    curTable.Id = matchedKeywords[1];
                    aColInfos = matchedKeywords[2].split(',');
                }

                const sColRegex = /((?:\w+)(?=(?:TEXT\(\d+\)|INTEGER|REAL)))((?:TEXT\(\d+\)|INTEGER|REAL))((?:NOTNULL|PRIMARYKEY|DEFAULT\d+)?)/;

                for(let i = 0; i < aColInfos.length; i++ ) {
                    
                    let sColInfo = aColInfos[i];
                                            
                    let matchedKeywords = sColInfo.match(sColRegex);
                    if(matchedKeywords === null)
                    {
                        continue;
                    }
                    
                    let colItem = new Object();
                    colItem.name = matchedKeywords[1];
                    colItem.type = matchedKeywords[2];

                    if(matchedKeywords.length == 4) {
                        colItem.condition = matchedKeywords[3];
                    }
                    curTable.cols.push(colItem);

                } // for END

                this.tables.push(curTable);
                console.log(this.tables);
            
            } // reader.onload = readerEvt => END

        } // file.onchange = evt => END

        file.click();
        file.remove();
    }
} 