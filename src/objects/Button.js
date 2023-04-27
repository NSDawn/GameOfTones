class Button {
    constructor (id, pos, size) {
        this.type = "Card";
        this.id = id; // string
        this.base = new ScreenElement(pos.copy(), new v2(size.x, size.y)); 
        this.base.isDraggable = false;
        this.sprite = this.id + "_down"
        
        this.isClicked = false;
        this.isHeld = false;
        this.disabled = false;
    }
    draw() {
        if (!this.disabled) {
            this.base.draw();
            if (this.isHeld) {
                this.isClicked = false;
            } else {
                this.isClicked = this.base.isMouseHovering && isMouseDown;
            }
            this.isHeld = this.base.isMouseHovering && isMouseDown;
        } else {
            this.isHeld = false;
            this.isClicked = false;
        }
        
        this.sprite = this.id + (this.disabled? "_button_disabled" : (this.base.isMouseHovering?  "_button_down" :  "_button_up")); 

    

    } 
    render() {
        if (!this.disabled) {this.base.render();};
        image(IMG[this.sprite], this.pos.x, this.pos.y, this.base.size.x, this.base.size.y);
    }
    get pos() {
        return this.base.pos.copy();
    }
    set pos(in_v2) {
        this.base.pos = in_v2.copy();
    }
}