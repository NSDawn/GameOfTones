class ScreenElement {
    constructor (pos = new v2(0,0), size = new v2(0,0)) {
        this.type = "ScreenElement";
        this.pos = pos; //v2
        this.size = size; //v2
        this.isMouseHovering = false;
        this.visible = false;
        this.isDragging = false;
        this.isSubDragging = false;
        this.isContained = false;
        this._mouseshift = new v2(0, 0);
    }
    draw() {
        noStroke();
       
        // update mouse hovering
        this.isMouseHovering = false
        if (!isMouseHovering) {
            this.isMouseHovering = mouse_pos.isWithin(this.pos, this.pos.shifted(this.size));
            if (this.isMouseHovering) {
                isMouseHovering = true;
                mouseHovering = this;
            }
        }
        // dragging around
        if (isMouseDown) {
            if (this.isMouseHovering && !this.isDragging && !isMouseHolding) {
                this.isDragging = true
                isMouseHolding = true;
                mouseHolding = this;
            }
            if (this.isDragging) {
                this.isContained = false;
                this.pos = new v2(mouse_pos.x - this.size.x/2, mouse_pos.y - this.size.y/2)
            }
        } else {this.isDragging = false}
    }  
    render() {
        // draw if visible
        if (this.visible) {
            fill(COLORS.test);
            rect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.size.x/16);
        }
        //check if mouse is hovering, draw border
        if (this.isMouseHovering && !isMouseHolding){
            fill(color(COLORS.white), 10);
            rect(this.pos.x -1, this.pos.y -1, this.size.x +2, this.size.y+2, (this.size.x+1)/16);
        }

    }

}