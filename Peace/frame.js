import { Point } from './point.js';
import { ImportItem } from './importItem.js';
import { ShowItem } from './showItem.js';

export class Frame {

    constructor() {
        this.pos = new Point(10, 10);
        
        this.nFrameWidth = 0;
        this.nFrameHeight = 0;
        this.nHeadPanelWidth = 0;
        this.nHeadPanelHeight = 0;

        this.nRightPanelStartXPos = 0;
        this.nRightPanelStartYPos = 0;
        this.nRightPanelWidth = 0;
        this.nRightPanelHeight = 0;

        this.aMainItems = [];
        this.aMainItems.push(new ImportItem());
        this.aMainItems.push(new ShowItem());

        this.importItem = this.aMainItems[0];
        this.showItem = this.aMainItems[1];
    }

    onDraw(context, nStageWidth, nStageHeight) {

        this.nFrameWidth = nStageWidth - 20;
        this.nFrameHeight = nStageHeight - 20;
        
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.lineWidth = 5;
        context.strokeRect(this.pos.x, this.pos.y, this.nFrameWidth, this.nFrameHeight);
        
        ////////////////////////////////
        
        this.nHeadPanelWidth = nStageWidth - 20;
        this.nHeadPanelHeight = 10 + 70;
        
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.lineWidth = 5;
        context.strokeRect(this.pos.x, this.pos.y, this.nHeadPanelWidth, this.nHeadPanelHeight);
        
        ////////////////////////////////

        this.nRightPanelWidth = 10 + 250;
        this.nRightPanelHeight = this.nFrameHeight;
        this.nRightPanelStartXPos = this.nFrameWidth - 250;
        this.nRightPanelStartYPos = this.pos.y;
        context.strokeStyle = 'rgb(0, 0, 0)';
        context.lineWidth = 5;
        context.strokeRect(this.nRightPanelStartXPos, this.nRightPanelStartYPos, this.nRightPanelWidth, this.nRightPanelHeight);

        ////////////////////////////////

        this.importItem.onDraw(context, this);
        this.showItem.onDraw(context, this);
    }
}