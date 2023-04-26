let test_cardA = new Card("xhua-21", new v2(10, 10));
let test_cardB = new Card("beku-21", new v2(30, 30));
let test_cardC = new Card("xhile-21", new v2(50, 30));
let test_cardD = new Card("lage-11", new v2(50, 30));
let test_cardE = new Card("ya-ado11", new v2(50, 30));
let test_cardF = new Card("beye-11", new v2(50, 30));

let level = 1; // 1-indexed!!

//let test_cont = new Container( new v2(50, 50),  new v2(10, 10), "Phoneme")
let isMouseHolding = false;
let mouseHolding = null;
let isMouseHovering = false;
let mouseHovering = null;

let screenObjects = {
    "Card": [],
}

class sceneGame {
    init () {
        screenObjects["Card"].push(test_cardA);
        screenObjects["Card"].push(test_cardB);
        screenObjects["Card"].push(test_cardC);
        screenObjects["Card"].push(test_cardD);
        screenObjects["Card"].push(test_cardE);
        screenObjects["Card"].push(test_cardF);
        loadLevel(level);
    }
    draw () {
        noSmooth()
        isMouseHovering = false;
        mouseHovering = null;
        // pre-check if the mouse is holding on to anything
        isMouseHolding = false;
        mouseHolding = null;
        for (let key in screenObjects) {
            for (let obj of screenObjects[key]) {
                obj.base.disabled = false
                if (obj.isDragging) {
                    isMouseHolding = true;
                    mouseHolding = obj;
                }
                obj.base.isSubDragging = false;
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
                if (obj.isSubDragging) {continue}; // will render subDragged blocks in the next code block
                obj.render();
            };
        };
        
        fill(color(COLORS.black));
        ellipse(mouse_pos.x, mouse_pos.y, 16 / SCALE)
        fill(color((mouseHolding == null) ? COLORS.white : COLORS.test));
        ellipse(mouse_pos.x, mouse_pos.y, 10 / SCALE)
    }

    
}

const PHONEMES = {
    "": {
        "id":"",
        "place": ["", ""],
        "manner":["", ""],
        "voice": true,
        "":"",
    },
    "p": {
        "id" : "p",
        "place":["labial", ""],
        "manner":["consonant", "plosive"],
        "voice": false,
    },
    "t": {
        "id":"t",
        "place": ["coronal",""],
        "manner":["consonant", "plosive"],
        "voice": false,
    },
    "c": {
        "id":"c",
        "place": ["palatal", ""],
        "manner":["consonant", "plosive"],
        "voice": false,
    },
    "k": {
        "id":"k",
        "place": ["velar", ""],
        "manner":["consonant", "plosive"],
        "voice": false,
    },
    "b": {
        "id" : "b",
        "place":["labial", ""],
        "manner":["consonant", "plosive"],
        "voice": true,
    },
    "d": {
        "id":"d",
        "place": ["coronal",""],
        "manner":["consonant", "plosive"],
        "voice": true,
    },
    "ɟ": {
        "id":"ɟ",
        "place": ["palatal", ""],
        "manner":["consonant", "plosive"],
        "voice": true,
    },
    "g": {
        "id":"g",
        "place": ["velar", ""],
        "manner":["consonant", "plosive"],
        "voice": true,
    },

}


function loadLevel(in_level) {
    CANVAS_SIZE.x / 8;

    screenObjects["Card"] = [];

    let i = 0;
    for (let word in WORDS[in_level - 1]) {
        i ++;
        console.log(SCALE)
        let newCard = new Card(word,  new v2(CANVAS_SIZE.x / SCALE / 16,  10), in_level - 1);
        screenObjects["Card"].push(newCard);
    }
}