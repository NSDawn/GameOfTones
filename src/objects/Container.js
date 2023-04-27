// Container class can contain screen-element-based classes
class Container {
    constructor(pos, size, content_type, category = null) {
        this.type = "Container";
        this.pos = pos.copy();                  // v2
        this.size = size.copy();                // v2
        this.content_type = content_type;       // str
        this.content = null;
        this._highlight = false;
        this.disabled = false;
        this._debug_visible = false;
        this.isGlossContainer = false;
        this.category = category;

    }
    draw() {
        // grab nearby blocks
        this.grabNearbyBlocks();
        
        if (!this.isEmpty()) { 
            this.content.pos = this.pos
            this.content.isContained = true;
            if (this.content.isDragging) {
                this.content.isContained = false;
                this.content = null;
            }
        }

        if (this.isGlossContainer && !this.isEmpty()) {
            this.content.text = WORDS[this.content._level][this.content.id].gloss;
        }


    }
    render() {
        image(IMG["container"], this.pos.x, this.pos.y, this.size.x, this.size.y);
        if (this._highlight) {
            fill(color(COLORS.white), 10);
            rect(this.pos.x, this.pos.y, this.size.x, this.size.y, (this.size.x+1)/16);
        }
    }
    isEmpty() {
        return this.content == null;
    }
    grabNearbyBlocks() {
        this._highlight = false;
        if (!this.isEmpty()) {return;}
        if (this.disabled) {return;}

        if (this.content_type == "Card") {
            for (let k = 0; k < screenObjects["Card"].length; k ++) {
                const obj = screenObjects["Card"][k];
                if (obj.type != "Card") {continue;}
                if (obj.isContained && !obj.isDragging) {continue;}
                if (obj.pos.shifted(obj.base.size.scaled(1/2)).isWithin(this.pos, this.pos.shifted(this.size))) {
                    if (obj.isDragging) {
                        this._highlight = true;
                    } else {
                        this.content = obj;
                    }

                }
            }
            return;
        }
    }
}

