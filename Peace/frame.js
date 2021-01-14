import { Point } from './Base/point.js';
import { Panel } from './Base/panel.js';
import { HeadPanel } from './Panel/headPanel.js';
import { RightPanel } from './Panel/rightPanel.js';
import { CenterPanel } from './Panel/centerPanel.js';

const FRAME_START_X = 10;
const FRAME_START_Y = 10;

export class Frame extends Panel{

    constructor() {
        super(FRAME_START_X, FRAME_START_Y);
        
        this.headPanel = new HeadPanel(this);
        this.rightPanel = new RightPanel(this);
        this.centerPanel = new CenterPanel(this);
        
    }

    onDraw(context, nMainWidth, nMainHeight) {

        super.setPanelWidth(nMainWidth - 20);
        super.setPanelHeight(nMainHeight - 20);
        super.onDraw(context);
        
        ////////////////////////////////
        
        this.headPanel.onDraw(context, this);
        this.rightPanel.onDraw(context, this);
        this.centerPanel.onDraw(context, this);
        ////////////////////////////////
    }

    onClick(mousePos) {
        this.rightPanel.onClick(mousePos);

        const newGrid = this.headPanel.onClick(mousePos);
        if(newGrid !== null) {
            console.log(newGrid);
            if(newGrid.type == 'sheet') {
                this.centerPanel.sheetList.push(newGrid);
            }
            return newGrid;
        }
        
        this.centerPanel.onClick(mousePos);
    }
}