
const SCENES = {
    "GAME": new sceneGame,
}

var currentScene = "GAME"
const IMG = {};
const FONT = {};
const SFX = {};
var isMouseClicked = false;
var isMouseDown = false;


function setup() {
    // setup runs once for the entire program
    createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y); // defined in style.js
    resizeScreen();
    startGame();
    SCENES[currentScene].init();
}

function preload() {
    for (let k = 0; k < IMG_LIST.length; k++) {
        IMG[IMG_LIST[k]] = loadImage("./assets/images/" + IMG_LIST[k] + ".png");
    }
    for (let k = 0; k < FONT_LIST.length; k++) {
        FONT[FONT_LIST[k]] = loadFont("./assets/fonts/" + FONT_LIST[k] + ".ttf");
    }
    for (let k = 0; k < SFX_LIST.length; k++) {
        const newSFX = new Audio('./assets/sfx/' + SFX_LIST[k] + ".mp3")
        SFX[SFX_LIST[k]] = newSFX;
    }

    // fill in any missing 
    for (let level of WORDS) {
        for (let word in level) {
            if (IMG[word] == null) {
                IMG[word] = loadImage("./assets/images/_missing.png");
            }
            if (SFX[word] == null) {
                const newSFX = new Audio("./assets/sfx/_missing.mp3");
                SFX[word] = newSFX;
            }
        }
    }
    
}
function draw() {
    
    noCursor();
    background(220);
    SCALE = CANVAS_SIZE.x/256
    scale(SCALE);
    noSmooth();

    SCENES[currentScene].draw()

    //reset inputs
    isMouseClicked = false;
    mouse_pos.x = mouseX / SCALE; mouse_pos.y = mouseY / SCALE;  

    //tick
    tick ++ ;
    if (tick == 60) {tick = 0};


    //handle screenSize
    resizeScreen();
    if (tick == 0) {
              
    }
    
}

function startGame() {
    currentScene = "GAME"
}

function changeScene(scene) {
    currentScene = scene;
    SCENES[currentScene].init();
}

function resizeScreen() {
    // resize screen?
    var originalWidth = CANVAS_SIZE.x
    if (windowWidth * 9 <= windowHeight * 16) {
        CANVAS_SIZE = new v2(windowWidth, windowWidth * (9/16));
    } else {
        CANVAS_SIZE = new v2(windowHeight*(16/9), windowHeight);
    }
    //resize window
    if (originalWidth != CANVAS_SIZE.x) {
        resizeCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y); 
    }
}

function mouseClicked() {
    isMouseClicked = true;
}
function mousePressed() {
    isMouseDown = true;
}
function mouseReleased() {
    isMouseDown = false;
}