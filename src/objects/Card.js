class Card {
    constructor (id, pos, _ref_level =0) {
        this.type = "Card";
        this.id = id; // string
        this.display_name = WORDS[_ref_level][id].display_name
        this.base = new ScreenElement(pos.copy(), new v2(20, 24)); 
        this.sprite = "card"

    }
    draw() {
        this.base.draw();
    } 
    render() {
        this.base.render()
        
        
        //this.sprite = (this.isContained && !this.base.isMouseHovering) - "phoneme_icon_faded" : "phoneme_icon";
        
        // image(IMG["phoneme_icon"], this.pos.x, this.pos.y, this.base.size.x, this.base.size.y);
        image(IMG[this.sprite], this.pos.x, this.pos.y, this.base.size.x, this.base.size.y);
        image(IMG[this.id], this.pos.x, this.pos.y, this.base.size.x, this.base.size.y);
       
        textAlign(CENTER, CENTER); textSize(this.base.size.y/4); textFont(FONT["MPLUS_Bold"]); fill(color(COLORS["black"]));
        text(this.display_name, this.pos.x + this.base.size.x/2, this.pos.y + this.base.size.y/6 );
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




const WORDS = [
    // used - instead of ' here because it's a more ok computer character 
    { // level 1
        "xhua-21": {
            "display_name": `xhua'`, // using backticks so all characters are allowed.
            "category": "falling",
            "gloss": "corn",
        },
        "beku-21": {
            "display_name": `beku'`, 
            "category": "falling",
            "gloss": "dog",
        },
        "xhile-21": {
            "display_name": `xhile'`, 
            "category": "falling",
            "gloss": "sheep",
        },
        "lage-11": {
            "display_name": `lage'`, 
            "category": "flat",
            "gloss": "leaf",
        },
        "ya-ado11": {
            "display_name": `ya'ado`, 
            "category": "flat",
            "gloss": "mountain",
        },
        "beye-11": {
            "display_name": `beye'`, 
            "category": "flat",
            "gloss": "snow",
        },
    },
];