import { NavItem } from './navItem.js'

export class TableNavItem extends NavItem{

    constructor(name, x, y) {
        super(name, x, y);
        this.file = null;
        this.tables = [];
    }

    onDraw(context, index, nHeadPanelWidth, nHeadPanelHeight) {
        super.onDraw(context, index, nHeadPanelWidth, nHeadPanelHeight);
    }

    onClick(point) {
        if(point.collide(this.pos, super.getWidth(), super.getHeight())) {
            console.log('Table Click');
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

                    let curTable = new Object();
                    curTable.columns = [];
                    curTable.Id = null;
                    
                    let columns = undefined;
                    
                    const sCreateRegex = /CREATETABLE(\w+)\(((?:.+)(?=(?:,CONSTRAINT))),((?:.+))\);/;
                    {
                        let matchedKeywords = content.match(sCreateRegex);
                        columns = matchedKeywords[2].split(',');
                        curTable.Id = matchedKeywords[1];
                    }

                    const sColumnRegex = /((?:\w+)(?=(?:TEXT\(\d+\)|INTEGER|REAL)))((?:TEXT\(\d+\)|INTEGER|REAL))((?:NOTNULL|PRIMARYKEY|DEFAULT\d+)?)/;

                    for(let i = 0; i < columns.length; i++ ) {
                        let column = columns[i];
                                                
                        let matchedKeywords = column.match(sColumnRegex);
                        if(matchedKeywords === null)
                        {
                            continue;
                        }
                        
                        let colItem = new Object();
                        colItem.name         = matchedKeywords[1];
                        colItem.type         = matchedKeywords[2];

                        if(matchedKeywords.length == 4) {
                            colItem.condition = matchedKeywords[3];
                        }
                        curTable.columns.push(colItem);
                    }
                    this.tables.push(curTable);
                    console.log(this.tables);
                }
            }
            file.click();
        }
    }
} 