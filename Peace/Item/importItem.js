import { PanelItem } from "../Base/panelItem.js";
import { TableInfo } from "../tableInfo.js";
import { TableInfoItem } from "../tableInfoItem.js";

export class ImportItem extends PanelItem{
    constructor(rightPanel) {
        super(rightPanel.getPos().x, rightPanel.getPos().y);     
        
        
        this.type = 'panel_item';
    }

    onDraw(context, rightPanel) {
        super.setPanelItemPos(rightPanel.getPos().x + 10, rightPanel.getPos().y + 10);
        super.setPanelItemWidth(( rightPanel.getPanelWidth() - 20 ) / 2);
        super.setPanelItemHeight(60);
        super.onDraw(context);
        
        context.font = '30px Cursive';
        context.fillText('Import', super.getPos().x + 20, super.getPos().y + 40);
    }

    onDown(mousePoint, rightPanel) {
        if(!mousePoint.collide(super.getPos(), super.getPanelItemWidth(), super.getPanelItemHeight())) {
            return;
        }

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
                content = content.replaceAll(/(\/\*(?:.+?)\*\/)/g, '');
                content = content.toUpperCase();

                let curTable = new TableInfo(this);
                                
                const sCreateRegex = /CREATETABLE(\w+)\(((?:.+)(?=(?:,CONSTRAINT))),((?:.+))\);/;
                
                let tmpColInfoArr = null;
                let tmpConstraintMap = new Map();                

                {
                    let matchedKeywords = content.match(sCreateRegex);
                    curTable.Id = matchedKeywords[1];
                    tmpColInfoArr = matchedKeywords[2].split(',');
                    if(matchedKeywords.length == 4) {
                        let sConstraint = matchedKeywords[3];
                        let tmpConstraint = sConstraint.match(/PRIMARYKEY\((.+?)\)/);
                        let tmpPkCols = tmpConstraint[1].split(',');
                        for(let i = 0 ; i < tmpPkCols.length; i++) {
                            tmpConstraintMap.set(tmpPkCols[i], 'PRIMARY KEY');
                        }
                        console.log(tmpConstraintMap);
                    }

                    let colItem = new TableInfoItem(this);
                    colItem.name = curTable.Id;
                    curTable.itemList.push(colItem);
                }
                
                const sColRegex = /((?:\w+)(?=(?:TEXT\(\d+\)|INTEGER|REAL)))((?:TEXT\(\d+\)|INTEGER|REAL))((?:NOTNULL|PRIMARYKEY|DEFAULT\d+)?)/;

                for(let i = 0; i < tmpColInfoArr.length; i++ ) {
                    
                    let sColInfo = tmpColInfoArr[i];
                                            
                    let matchedKeywords = sColInfo.match(sColRegex);
                    if(matchedKeywords === null)
                    {
                        console.log('Parsing Fail ' + matchedKeywords);
                        continue;
                    }
                    
                    let colItem = new TableInfoItem(this);
                    colItem.name = matchedKeywords[1];
                    colItem.dataType = matchedKeywords[2];

                    if(matchedKeywords.length == 4) {
                        colItem.condition.push(matchedKeywords[3]);
                        if(tmpConstraintMap.has(colItem.name)) {
                            colItem.condition.push(tmpConstraintMap.get(colItem.name));
                        }
                    }
                    curTable.itemList.push(colItem);
                } // for END

                console.log(curTable);
                rightPanel.tables.push(curTable);
            } // reader.onload = readerEvt => END

        } // file.onchange = evt => END

        file.click();
        file.remove();
        
        return this;
    }

    onMove(mousePos) {
        return null;
    }
} 