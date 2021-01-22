import { Panel } from './Base/panel.js';
import { HeadPanel } from './Panel/headPanel.js';
import { RightPanel } from './Panel/rightPanel.js';
import { CenterPanel } from './Panel/centerPanel.js';

const FRAME_START_X = 10;
const FRAME_START_Y = 10;

export class Frame extends Panel{

    constructor(main) {
        super(FRAME_START_X, FRAME_START_Y);
        super.setPanelWidth(main.nStageWidth - 20);
        super.setPanelHeight(main.nStageHeight - 20);
        
        this.headPanel = new HeadPanel(this);
        this.rightPanel = new RightPanel(this);
        this.centerPanel = new CenterPanel(this);
        
    }

    onDraw(context) {


        super.onDraw(context);
        
        ////////////////////////////////
        
        this.headPanel.onDraw(context, this);
        this.rightPanel.onDraw(context, this);
        this.centerPanel.onDraw(context, this);
        ////////////////////////////////
    }

    onDown(mousePos) {
        if(mousePos.collide(this.headPanel.getPos(), this.headPanel.getPanelWidth(), this.headPanel.getPanelHeight())) {
            const newItem = this.headPanel.onDown(mousePos);
            if(newItem !== null) {
                return newItem;
            }
        } else if(mousePos.collide(this.rightPanel.getPos(), this.rightPanel.getPanelWidth(), this.rightPanel.getPanelHeight())) {
            return this.rightPanel.onDown(mousePos);
        } else if(mousePos.collide(this.centerPanel.getPos(), this.centerPanel.getPanelWidth(), this.centerPanel.getPanelHeight())) {
            return this.centerPanel;
        } else {
            return null;
        }
    }    
}