class Card {
    constructor (id, pos, _ref_level =0) {
        this.type = "Card";
        this.id = id; // string
        this._level = _ref_level
        this.display_name = WORDS[_ref_level][id].display_name
        this.text = this.display_name;
        this.base = new ScreenElement(pos.copy(), new v2(20, 24)); 
        this.sprite = "card"
        this.isContained = false;
        this._home_pos = pos.copy();
        
        this.isClicked = false;
        this.isHeld = false;
    }
    draw() {
        this.base.draw();
        
        if (this.isHeld) {
            this.isClicked = false;
        } else {
            this.isClicked = this.isDragging;
        }
        this.isHeld = this.isDragging;

        if (this.isClicked) {SFX[this.id].play()}
    
        // if it's contained by something, allow that container to overwrite its text
        if (!this.isContained) {
            this.text = this.display_name;
        }

    } 
    render() {
        this.base.render()
        
        image(IMG[this.sprite], this.pos.x, this.pos.y, this.base.size.x, this.base.size.y);
        image(IMG[this.id], this.pos.x, this.pos.y, this.base.size.x, this.base.size.y);
       
        stroke(COLORS["card_color"]); strokeWeight(1);
        textAlign(CENTER, CENTER); textSize(this.base.size.y/4); textFont(FONT["MPLUS_Bold"]); fill(color(COLORS["white"]));
        text(this.text, this.pos.x + this.base.size.x/2, this.pos.y + this.base.size.y/6 );
        noStroke();

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

    get category() {
        return WORDS[this._level][this.id]["category"];
    }
    set disabled(in_bool){
        this.base.disabled = in_bool
    }
    get disabled() {
        return this.base.disabled;
    }
}




