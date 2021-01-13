import { Point } from './Base/point.js';
import { Panel } from './Base/panel.js';
import { HeadPanel } from './Panel/headPanel.js';
import { RightPanel } from './Panel/rightPanel.js';

const FRAME_START_X = 10;
const FRAME_START_Y = 10;

export class Frame extends Panel{

    constructor() {
        super(FRAME_START_X, FRAME_START_Y);
        
        this.headPanel = new HeadPanel(this);
        this.rightPanel = new RightPanel(this);
    }

    onDraw(context, nMainWidth, nMainHeight) {

        super.setPanelWidth(nMainWidth - 20);
        super.setPanelHeight(nMainHeight - 20);
        super.onDraw(context);
        
        ////////////////////////////////
        
        this.headPanel.onDraw(context, this);
        this.rightPanel.onDraw(context, this);
        
        ////////////////////////////////
    }

    onClick(mousePos) {
        this.rightPanel.onClick(mousePos);
        // this.headPanel.onClick(mousePos);
    }
}