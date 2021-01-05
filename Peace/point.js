export class Point {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    collide(point, width, height) {
        if(this.x >= point.x && 
            this.x <= point.x + width &&
            this.y >= point.y &&
            this.y <= point.y + height) {
                return true;
            } else {
                return false;
            }
    }
    
    clone() {
        return new  Point(this.x, this.y); 
    }
}