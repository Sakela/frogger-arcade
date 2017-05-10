// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//Reset enemy's position once it reaches the end of the canvas
Enemy.prototype.reset = function() {
    this.row = 83 * getRandomNum(0,2);
    this.x = 0;
    this.y = 60 + this.row;
    this.speed = getRandomNum(2,5);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed;

    if(this.x > 6 * 83) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
    var diffX = this.x - player.x;
    var diffY = this.y - player.y;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance < 50) {
        this.reset();
        player.reset();
        player.score = 0;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite) {
    this.reset();
    this.score = 0;
    this.sprite = sprite;
};

//Reset player's position after collision or after reaching top part of canvas
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 66 * 6;
};

Player.prototype.update = function(dt) {
    //Reset player's position after setting .col and .row key values to default
    if(this.y < 0) {
        this.reset();
        this.score++;
    }
};

Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput =  function(input) {
    if ( player.sprite !== undefined ) {
        switch(input) {
            case 'up':
                this.y -= 83;
                break;
            case 'down':
                this.y += 83;
                break;
            case 'left':
                this.x -= 101;
                break;
            case 'right':
                this.x += 101;
                break;
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.y > 396) {
            this.y = 396;
        } else if (this.x > 404) {
            this.x = 404;
        }
    }
};

//This class is setting properties and methods for Extras(Loot) objects that will appear as bonus points.
var Loot = function() {
    this.reset();

};

Loot.prototype.reset = function() {
    this.x = 101 * getRandomNum(0,4);
    this.y = 83 * getRandomNum(1,3);
    this.sprite = this.getRandomLoot();
};

Loot.prototype.update = function(){
    // allLoot.forEach(function(loot) {
        loot.render();
    // });
};

Loot.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Loot.prototype.checkCollisions = function() {
    var diffX = this.x - player.x;
    var diffY = this.y - player.y;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance < 50) {
        this.x = -100;
        setTimeout(function(){
            // allLoot.forEach(function(loot) {
                loot.getRandomLoot();
                loot.reset();
            // });
        }, getRandomNum(4000, 9000));
        player.score += 3;
    }
};

Loot.prototype.getRandomLoot = function() {
    var instance = allLoot[Math.floor(Math.random() * allLoot.length)];
    return instance;
    console.log(instance);
}

//Get random whole number and use it with methods of objects
function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for(var i = 0; i < 3; i++){
    allEnemies.push(new Enemy());
}

var allPlayers=[];

var boy = new Player("images/char-boy.png");
var catGirl = new Player("images/char-cat-girl.png");
var hornGirl = new Player("images/char-horn-girl.png");
var pinkGirl = new Player("images/char-pink-girl.png");
var princessGirl = new Player("images/char-princess-girl.png");

allPlayers.push(boy, catGirl, pinkGirl, princessGirl, hornGirl);

var player = new Player();

var allLoot =["images/Gem Orange.png", "images/Heart.png", "images/Gem Blue.png", "images/Key.png"];

var loot = new Loot();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
