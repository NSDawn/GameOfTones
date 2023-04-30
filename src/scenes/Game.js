let level = 1; // 1-indexed!!
let max_level = level;

let isMouseHolding = false;
let mouseHolding = null;
let isMouseHovering = false;
let mouseHovering = null;


let screenObjects = {
    "Container": [],
    "Button": [],
    "Card": [],  
}

let _categories = {}

// screen elements that will need to be referenced globally
let glossContainer = new Container(new v2(228, 19), new v2(20, 24), "Card");
let resetButton = new Button("reset", new v2(210, 12), new v2(16, 16));
let helpButton = new Button("help", new v2(210, 30), new v2(16, 16));
let checkButton = new Button("check", new v2(210, 96), new v2(16, 16));
let rightButton = new Button("right", new v2(228, 114), new v2(16, 16))
let leftButton = new Button("left", new v2(210, 114), new v2(16, 16))

class sceneGame {
    init () {
        loadLevel(level);
        screenObjects["Button"].push(resetButton);
        screenObjects["Button"].push(helpButton);
        screenObjects["Button"].push(checkButton);
        screenObjects["Button"].push(rightButton);
        screenObjects["Button"].push(leftButton);
    }
    draw () {
        let i;
        image(IMG["bg"], 0, 0)
        

        noSmooth()

        // write titles of categories to the screen
        i = 1;
        const categoriesLength = Object.keys(_categories).length
        
        for (let category in _categories) {
            i++;
            const yPos = (i * ((CANVAS_SIZE.y /SCALE) * (3/2)) / (categoriesLength + 2) ) - ((CANVAS_SIZE.y /SCALE)* (3/8)) - 16; 
            fill(COLORS["category"]); rect(CANVAS_SIZE.x / SCALE/ 6, yPos, 5 *CANVAS_SIZE.x / SCALE/ 8, CANVAS_SIZE.y / SCALE/ 6)
            
            stroke(COLORS["bg_color"]); strokeWeight(1);
            textAlign(LEFT, CENTER); textSize(CANVAS_SIZE.x/128); textFont(FONT["MPLUS_Bold"]); fill(COLORS["black"]);
            text(CATEGORIES[category]["display_name"], CANVAS_SIZE.x / SCALE/ 6, yPos- CANVAS_SIZE.y/256);
            noStroke();
        }

        isMouseHovering = false;
        mouseHovering = null;
        // pre-check if the mouse is holding on to anything
        isMouseHolding = false;
        mouseHolding = null;
        for (let key in screenObjects) {
            for (let obj of screenObjects[key]) {
                // obj.disabled = false
                if (obj.isDragging) {
                    isMouseHolding = true;
                    mouseHolding = obj;
                }
            };
        }
        
        // move mouseHolding item to the top
        if (mouseHolding != null) {
            if (mouseHolding.type == "Card") {
                let key = mouseHolding.type;
                let f = false;
                for (let i = 0; i < screenObjects[key].length; i++) {
                    if (screenObjects[key][i] === mouseHolding) {
                        screenObjects[key].splice(i, 1)
                        f = true
                    }
                }
                if (f) {screenObjects[key].push(mouseHolding);}
            }
            
        }
        // in reverse order, draw (tell them to function)
        const keys = Object.keys(screenObjects);
        for (let i = keys.length - 1; i >= 0; i--) {
            for (let j = screenObjects[keys[i]].length -1; j >= 0; j--) {
                screenObjects[keys[i]][j].draw()
            };
        };
        // render, show them to screen
        for (let key in screenObjects) {
            for (let obj of screenObjects[key]) {
                obj.render();
            };
        };

        // // // // // // // // // // // // // // // 
        // BUTTONS AND STUFF                      //
        // // // // // // // // // // // // // // // 
        
        // run GlossContainer
        if (glossContainer.content !== null) {
            helpButton.disabled = false;
        } else {
            helpButton.disabled = true;
        }

        // run reset button
        if (resetButton.isClicked) {
            SFX["button-default"].play();
            loadLevel(level);
        }

        // run help button
        if (helpButton.isClicked){
            SFX["button-default"].play();
        }
        if (helpButton.isHeld) {
            textAlign(CENTER, CENTER); textSize(4); textFont(FONT["MPLUS_Bold"]); fill(COLORS["black"]);
            text(CATEGORIES[WORDS[level -1][glossContainer.content.id]["category"]]["display_name"], 229, 51);
        }
        
        // run check button
        if (checkButton.isClicked) {
            let f = true
            for (let container of screenObjects["Container"]) {
                if (container.content == null) {
                    if (!container.isGlossContainer) {f = false} 
                    ; continue;
                }
                if (container.content.category != container.category) {
                    container.content.pos = container.content._home_pos.copy()
                    container.content.isContained = false;
                    container.content = null;
                    f = false;
                }
            }
            if (f) {
                max_level = min(WORDS.length, level + 1);
                SFX["button-correct"].play();
            } else {
                SFX["button-incorrect"].play();
            }
        }

        // run left and right buttons
        rightButton.disabled = (level >= max_level);
        leftButton.disabled = !(level > 1);

        
        if (rightButton.isClicked) {
            SFX["button-default"].play();
            level += 1;
            loadLevel(level);
        }
        if (leftButton.isClicked) {
            SFX["button-default"].play();
            level -= 1;
            loadLevel(level);
        }

    }
}

function loadLevel(in_level) {
    CANVAS_SIZE.x / 8;

    screenObjects["Container"] = [];
    screenObjects["Card"] = [];
    _categories = {};

    // append cards for each word in the level.
    const wordsLength = Object.keys(WORDS[in_level - 1]).length
    let wordsArr = [];
    for (let word in WORDS[in_level - 1]) {  // this creates an array and then randomizes it 
        wordsArr.push(word)
    }
    wordsArr = wordsArr.sort((a, b) => 0.5 - Math.random());
    let i = 1;
    for (let word of wordsArr) {
        i ++;
        let yPos = (i * ((CANVAS_SIZE.y /SCALE)* (7/8)) / (wordsLength+2)  ) - (18) + ((CANVAS_SIZE.y /SCALE)* (1/16));
        let xPos = (CANVAS_SIZE.x / SCALE / 32) + ((i % 2) * (CANVAS_SIZE.x / SCALE / 32))

        let newCard = new Card(word,  new v2(xPos,  yPos), in_level - 1);
        screenObjects["Card"].push(newCard); 
    }

    // go through the words, and count how many of each category there are.
    for (let word of screenObjects["Card"]) {
        if (_categories[word.category] == null) {
            _categories[word.category] = []; 
        }
        _categories[word.category].push(word);
    }

    // draw the containers for each category
    i = 1;
    const categoriesLength = Object.keys(_categories).length
    for (let category in _categories) {
        i ++;
        j = 1;
        const yPos = (i * ((CANVAS_SIZE.y /SCALE) * (3/2)) / (categoriesLength + 2) ) - ((CANVAS_SIZE.y /SCALE)* (3/8)) - 12; 
        const wordLength = _categories[category].length
        for (let word in _categories[category]) {
            j ++;
            const xPos = (j * ((CANVAS_SIZE.x /SCALE) * (7/8)) / (wordLength + 2) ) - (12)  ;
            let newCont = new Container(new v2(xPos, yPos), new v2(20, 24), "Card", category)
            screenObjects["Container"].push(newCont);
        }
    }

    // right side container
    glossContainer = new Container(new v2(228, 19), new v2(20, 24), "Card");
    glossContainer.isGlossContainer = true;
    screenObjects["Container"].push(glossContainer);
}

 


(undefined/null+[])[+[]]
// > N

(true == "true") , (true == "1")
// > true, false

""+!![]
// 'true'

([]+{})[+!![]]
// "o"