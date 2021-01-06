import { NavItem } from './navItem.js'

export class TableNavItem extends NavItem{

    constructor(name, x, y) {
        super(name, x, y);
        this.file = null;
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
                    content = content.replaceAll('\n', '');                    
                    console.log(content);
                }
            }

            file.click();
        }
    }
} 