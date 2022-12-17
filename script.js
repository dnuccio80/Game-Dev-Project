const canvas =  document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 800;
let enemiesArray = [];
const numberOfEnemies = 10;
let gameOver = false;
let lifes = 3;
let score = 0;
let shootArray = [];


class Player {
	constructor() {
		this.spriteWidth = 440;
		this.spriteHeight = 522;
		this.width = this.spriteWidth/5;
		this.height = this.spriteHeight/5;
		this.image = playerImage;
		this.x = canvas.width/2 - this.width/3;
		this.y = canvas.height - this.height;
		this.frame = 0;
		this.interval = 20;
		this.frameInterval = 0;
		this.velocityPlayer = 7;
	}

	update(deltaTime, inputHandler) {
		//Control de Frames Animation de player
		this.frameInterval += deltaTime;
		if(this.frameInterval >= this.interval) {
			this.frame<15 ? this.frame++ : this.frame = 0;
			this.frameInterval = 0;
		} 

		//Limit Movements

		if(this.x <= 0) this.x = 0;
		if(this.x >= canvas.width - this.width) this.x = canvas.width - this.width;
		if(this.y <= 0) this.y = 0;
		if(this.y > canvas.height - this.height) this.y = canvas.height - this.height


		//Movement Handlers
		if (inputHandler.keys.indexOf("ArrowRight") > -1) {
			this.x += this.velocityPlayer;
		}

		if (inputHandler.keys.indexOf("ArrowLeft") > -1) {
			this.x -= this.velocityPlayer;
		}

		if (inputHandler.keys.indexOf("ArrowUp") > -1) {
			this.y -= this.velocityPlayer;
		}

		if (inputHandler.keys.indexOf("ArrowDown") > -1) {
			this.y += this.velocityPlayer;
		}
	}

	draw() {
		// ctx.fillRect(this.x, this.y, this.width, this.height)
		// 							sx,sy,sw,sh,dx,dy,dw,dh
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0 , this.spriteWidth, this.spriteHeight,
			this.x, this.y, this.width, this.height )
	}
}

class Enemy {
	constructor () {
		this.y = -50;
		this.spriteWidth = 310;
		this.spriteHeight = 206;
		this.width = this.spriteWidth/3;
		this.height = this.spriteHeight/3;
		this.image = enemyImage;
		this.velocityEnemy = Math.random() * 6 + 1;
		this.x = Math.random() * (canvas.width - this.width);
		this.markedForDeletion = false;
	}

	update(deltaTime) {
		this.y += this.velocityEnemy; 
		if(this.y > canvas.height) {
			// score++;
			this.markedForDeletion = true;
			lifes--;
		} 
	}

	draw() {
							// sx,sy,sw,sh,dx,dy,dw,dh
		ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
	}
}

class Shoot {

	constructor() {
		this.spriteWidth = 43;
		this.spriteHeight = 117;
		this.image = shootImage;
		this.width = this.spriteWidth/2;
		this.height = this.spriteHeight/2;
		this.x = player.x + player.width/4;
		this.y = player.y + player.height/4;
	}

	update(deltaTime, player){
		this.y-= deltaTime;
		if(this.y < 0) {
			this.markedForDeletion = true;
		} 
	}

	draw() {
		ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y,
			this.width, this.height)
	}

}

class InputHandler {
	
	constructor() {

		this.keys = [];

		window.addEventListener('keydown', e => {
	
			if( (e.key === "ArrowUp"    ||
				 e.key === "ArrowDown"  || 
				 e.key === "ArrowLeft"  || 
				 e.key === "ArrowRight" ||
				 e.key === "z"  ) &&
				 this.keys.indexOf(e.key) === -1  ) {
				this.keys.push(e.key);

			}
			console.log(this.keys);
		});

		window.addEventListener('keyup', e => {
			if (   e.key === "ArrowUp"    ||
				   e.key === "ArrowDown"  ||
				   e.key === "ArrowLeft"  ||
				   e.key === "ArrowRight" ||
				   e.key === "z" ) {

				this.keys.splice(this.keys.indexOf(e.key), 1);
			} 
			console.log(this.keys);
		});

		window.addEventListener('keydown', e => {
			if( e.key === "z" ) {
				shootArray.push(new Shoot());
			}
		});
	}
}

class InputText {
	constructor(){
		this.spriteWidth = 96;
		this.spriteHeight = 96
		this.width = this.spriteWidth/2;
		this.height = this.spriteHeight/2;
		this.imageRed = heartImage;
	}

	update() {
		if(lifes == 0) gameOver = true;
	}

	draw() {

		for ( var i = 1; i <= lifes; i++) {
			ctx.drawImage(this.imageRed, 0, 0, this.spriteWidth, this.spriteHeight, i * 50, 50, 
				this.width, this.height );
		}

		ctx.save();
		ctx.fillStyle = "#fff";
		ctx.font = "40px Helvetica"
		ctx.fillText(`Score: ${score}`, canvas.width - 250 , 80 );
		ctx.restore();
	}

	drawGameOver() {
		ctx.save();
		ctx.textAlign = "center"
		ctx.font = "40px Helvetica"
		ctx.fillStyle = "#000"
		ctx.fillText("Gamer Over! Try Again :)", canvas.width/2 + 4, canvas.height/2 + 4)
		ctx.fillStyle = "#fff"
		ctx.fillText("Gamer Over! Try Again :)", canvas.width/2 , canvas.height/2)
		ctx.restore();
	}
}

const player = new Player();
const inputHandler = new InputHandler();
const inputText = new InputText();
// const newShoot = new Shoot();

let lastTime = 1;
let timePerEnemy = 0;

function animate(timeStamp) {
	const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	player.update(deltaTime,inputHandler);
	player.draw();
	inputText.update();
	inputText.draw();
	// newShoot.update(deltaTime);
	// newShoot.draw();
	shootArray.forEach( elem => {
		elem.update(deltaTime, player);
		elem.draw();
	});

	timePerEnemy += deltaTime;
	let intervalPerEnemy = 1000;

	// if(timePerEnemy > intervalPerEnemy) {
	// 	enemiesArray.push(new Enemy())
	// 	timePerEnemy = 0;
	// }

	// enemiesArray.forEach( elem => {
	// 	elem.update(deltaTime);
	// 	elem.draw();
	// });
	shootArray = shootArray.filter(elem => !elem.markedForDeletion);
	enemiesArray = enemiesArray.filter(elem => !elem.markedForDeletion);
 	// if(!gameOver){
 	// 	requestAnimationFrame(animate);
 	// } else {
 	// 	inputText.drawGameOver();
 	// }
 	requestAnimationFrame(animate);
}

animate(0);