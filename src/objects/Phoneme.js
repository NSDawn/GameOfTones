class Phoneme {
    constructor (id, pos) {
        this.type = "Phoneme";
        this.id = id; // string
        this.base = new ScreenElement(pos.copy(), new v2(10, 10)); 
        this.cont = null
        this.sprite = "phoneme_icon"

        //this.cont = new Container(pos.shifted(new v2(10, 0)), new v2(10, 10), "Phoneme");
    }
    draw() {
        this.base.draw();

        //this.cont.draw();
        //this.cont.pos = this.pos.shifted(new v2(10,0));
    } 
    render() {
        this.base.render()
        //console.log(this.isContained);
        
    
        this.sprite = (this.isContained && !this.base.isMouseHovering) ? "phoneme_icon_faded" : "phoneme_icon";
        
        // image(IMG["phoneme_icon"], this.pos.x, this.pos.y, this.base.size.x, this.base.size.y);
        image(IMG[this.sprite], this.pos.x, this.pos.y, this.base.size.x, this.base.size.y);
       
        textAlign(CENTER, CENTER); textSize(this.base.size.y/2); textFont(FONT["MPLUS_Bold"]); fill(color(COLORS["black"]));
        text(this.id, this.pos.x + this.base.size.x/2, this.pos.y + this.base.size.x/4 );
    }
    get pos() {
        return this.base.pos.copy();
    }
    set pos(in_v2) {
        this.base.pos = in_v2.copy();
    }
    get isDragging() {
        return this.base.isDragging;
    }
    get isSubDragging() {
        return this.base.isSubDragging;
    }
    get isContained() {
        return this.base.isContained;
    }
    set isContained(in_bool) {
        this.base.isContained = in_bool;
    }
}
