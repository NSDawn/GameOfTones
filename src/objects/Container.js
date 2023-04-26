// Container class can contain screen-element-based classes
class Container {
    constructor(pos, size, content_type) {
        this.type = "Container";
        this.pos = pos.copy();                  // v2
        this.size = size.copy();                // v2
        this.content_type = content_type;       // str
        this.content = null;
        this._highlight = false;
        this.disabled = false;
        this._debug_visible = false;

    }
    draw() {
        // grab nearby blocks
        this.grabNearbyBlocks();
        
        if (!this.isEmpty()) { 
            this.content.pos = this.pos
            this.content.isContained = true;
            if (this.content.isDragging) {
                this.content = null;
            }
        }

    }
    render() {
        if (this._debug_visible) {
            fill(color(COLORS.test), 10);
            rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        }
        if (this._highlight) {
            fill(color(COLORS.white), 10);
            rect(this.pos.x, this.pos.y, this.size.x, this.size.y, (this.size.x+1)/16);
        }
        if (this.content_type == "Phoneme" && !this.isEmpty()) {
            image(IMG["phoneme_icon_fadedB"], this.pos.x, this.pos.y, this.size.x, this.size.y);
        }
    }
    isEmpty() {
        return this.content == null;
    }
    grabNearbyBlocks() {
        this._highlight = false;
        if (!this.isEmpty()) {return;}
        if (this.disabled) {return;}
        if (this.content_type == "Phoneme") {
            for (let k = 0; k < screenObjects["Phoneme"].length; k ++) {
                const obj = screenObjects["Phoneme"][k];
                if (obj.type != "Phoneme") {continue;}
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
        if (this.content_type == "Block") {
            for (let k = 0; k < screenObjects["Block"].length; k ++) {
                const obj = screenObjects["Block"][k];
                if (obj.type != "Block") {continue;}
                if (obj.isContained && !obj.isDragging) {continue;}
                if (obj.pos.shifted(obj.base.size.scaled(1/2)).isWithin(this.pos, this.pos.shifted(this.size))) {
                    if (obj.isDragging) {
                        fill(color(COLORS.white), 10);
                        rect(this.pos.x, this.pos.y, this.size.x, this.size.y, (this.size.x+1)/16);
                    } else {
                        this.content = obj;
                    }

                }
            }
            return;
        }
    }
}

