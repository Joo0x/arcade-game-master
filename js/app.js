// Enemies our player must avoid
const a = document.querySelector('span');
var Enemy = function(x , y , speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;
    //when enemy disaper call its agian
     if (this.x > 560) {
       this.x = -50;
       this.speed = 100 + Math.floor(Math.random() * Math.floor(500));
     };
     this.checkCollisions();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// check if the enemy hit the player
Enemy.prototype.checkCollisions = function()
{
  if (player.x < this.x + 40 &&
        player.x + 40 > this.x &&
        player.y < this.y + 30 &&
        30 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
};
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player  = function(x,y)
{
 this.hero = 'images/char-boy.png';
 this.x = x;
 this.y = y;
 this.score = 0;
};

Player.prototype.update = function(dt) {
  //To check player x y position
  // console.log('x' + player.x);
  // console.log('y' + player.y);

  if (this.y <= -10) {
    // i would be able use the scope of player
    let that = this;
    setTimeout(function(){
      that.x = 202;
      that.y = 405;
    }, 220);

}

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.hero), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {

    if (keyPress == 'a' && this.x > 0) {
        this.x -= 102;
    };

    if (keyPress == 'd' && this.x < 405) {
        this.x += 102;
    };

    if (keyPress == 'w' && this.y > 0) {
        this.y -= 83;
    };

    if (keyPress == 's' && this.y < 405) {
        this.y += 83;
    };

    if (this.y <= -10) {
      this.score += 1;
      a.innerText = ` Score:\n${this.score} `;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
allEnemies.push(new Enemy(-10 , 53 , 400));
allEnemies.push(new Enemy(-10 ,133 , 200));
allEnemies.push(new Enemy(-10 , 213 , 600));


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
let player = new Player(202 , 405);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        65: 'a',
        87: 'w',
        68: 'd',
        83: 's'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
