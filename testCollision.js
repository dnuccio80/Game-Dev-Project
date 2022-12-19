const canvas =  document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 800;
let shootArray = [];
let enemiesArray = [];


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
		this.velocityPlayer = 3;
		this.oX;
		this.oY;
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

		//Collision Handler

		this.oX = this.x + this.width;
		this.oY = this.y + this.height;
	}

	draw() {
		ctx.strokeStyle = "#fff";
		ctx.strokeRect(this.x, this.y, this.width, this.height)
		// 							sx,sy,sw,sh,dx,dy,dw,dh
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0 , this.spriteWidth, this.spriteHeight,
			this.x, this.y, this.width, this.height )
	}

	mostraOcupation () {
		console.log(`This.x: ${this.x}`);
		console.log(`This.width: ${this.width}`);
		console.log(`Ocupation X: ${this.oX}`);
		console.log(`This.y: ${this.y}`);
		console.log(`This.height: ${this.height}`);
		console.log(`Ocupation Y: ${this.oY}`);
	}
}

class Enemy {
	constructor () {
		this.spriteWidth = 310;
		this.spriteHeight = 206;
		this.width = this.spriteWidth/3;
		this.height = this.spriteHeight/3;
		this.image = enemyImage;
		this.velocityEnemy = Math.random() * 6 + 1;
		this.x = Math.random() * (canvas.width - this.width);
		// this.x  = canvas.width/2
		this.y = canvas.height / 2;
		this.markedForDeletion = false;
		this.oY;
		this.oX;
		this.collisionX;
		this.collisionY;
		this.collisionanX = false;
		this.collisionanY = false;

	}

	update(deltaTime) {
		// this.y += this.velocityEnemy; 
		if(this.y > canvas.height) {
			this.markedForDeletion = true;
		} 

		this.oX = this.x + this.width;
		this.oY = this.y + this.height;

		this.collisionX = this.x - player.oX; 
		this.collisionY = player.y - this.oY;

		// if(this.markedForDeletion) {
		// 	console.log("enemigo morreu");
		// }

	}

	draw () {
		ctx.strokeStyle = "#fff";
		ctx.strokeRect(this.x, this.y, this.width, this.height)
							// sx,sy,sw,sh,dx,dy,dw,dh
		ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
	}

	mostraOcupation () {
		// console.log(`This.x: ${this.x}`);
		// console.log(`This.width: ${this.width}`);
		// console.log(`Ocupation X: ${this.oX}`);
		// console.log(`This.y: ${this.y}`);
		// console.log(`This.height: ${this.height}`);
		// console.log(`Ocupation Y: ${this.oY}`);
		// console.log(`Diferencia en X: ${this.collisionX}`);
		// console.log(`Diferencia en Y ${this.collisionY}`);
		shootArray.forEach( elem => {
			if (elem.y < this.y) this.markedForDeletion; 

		});
	}

	MostraChocan() {
		if(this.collisionY <= 0 && this.collisionY >= -(this.height + player.height) ) {
			this.collisionanY = true
		} else {
			// this.collisionanY = false;
		}

		if(this.collisionX <= 0 &&  this.collisionX >= -(this.width + player.width) ) {
			this.collisionanX = true
		} else {
			// this.collisionanX = false;
			
		}

		// if (this.collisionanX) console.log("Estan colisionando en X");
		// else console.log("No estan colisionando en X");
		// if(this.collisionanY) console.log("Estan colisionando en Y");
		// else console.log("No estan colisionando en Y");
		if(this.collisionanX && this.collisionanY) {
			console.log("Estan colisionando zgaturro");
			this.markedForDeletion = true;	
		} 
		else console.log("No colisionan pai");
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
		ctx.strokeRect(this.x, this.y, this.width, this.height);
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
				   e.key === "z" 		  ||
				   e.key === "x") {

				this.keys.splice(this.keys.indexOf(e.key), 1);
			} 
			console.log(this.keys);
		});

		window.addEventListener('keydown', e => {
			if( e.key === "z" ) {
				shootArray.push(new Shoot());
				enemiesArray.forEach( elem => {
					elem.mostraOcupation();
					elem.MostraChocan();
				});
				
			}
		});

		window.addEventListener('keydown', e => {
			if( e.key === "x" ) {
				// shootArray.push(new Shoot());
				player.mostraOcupation();
			}
		});
	}
}

const player = new Player();
const inputHandler = new InputHandler();

for ( i = 0 ; i < 3; i++ ) {
	enemiesArray.push(new Enemy(player));

}

let lastTime = 1;

function animate(timeStamp) {
	const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	player.update(deltaTime,inputHandler);
	player.draw();
	enemiesArray.forEach( elem => {
		elem.update(shootArray);
		elem.draw();
	});
	shootArray.forEach( elem => {
		elem.update(deltaTime, player);
		elem.draw();
	});
	shootArray = shootArray.filter(elem => !elem.markedForDeletion);
	enemiesArray = enemiesArray.filter(elem => !elem.markedForDeletion);
 	requestAnimationFrame(animate);
}

animate(0);