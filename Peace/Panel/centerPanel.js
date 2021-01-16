import { Panel } from '../Base/panel.js';

export class CenterPanel extends Panel {
    constructor(frame) {
        super(frame.pos.x, frame.pos.y);

        this.sheetList = [];
    }

    onDraw(context, frame) {        

        super.setPanelPos(frame.pos.x, frame.pos.y);
        super.setPanelWidth(frame.getPanelWidth());
        super.setPanelHeight(80);
        super.onDraw(context);

        let nSheetListLen = this.sheetList.length;
        for(let i = 0; i < nSheetListLen; i++) {
            this.sheetList[i].onDraw(context, this);
        }

    }

    onClick(mousePos) {
        let nSheetListLen = this.sheetList.length;
        for(let i = 0; i < nSheetListLen; i++) {
            const newSheet = this.sheetList[i].onClick(mousePos.clone());
            if(newSheet !== null) {
                console.log(newSheet);
            }
        }
    }
} 