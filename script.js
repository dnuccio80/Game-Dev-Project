const canvas =  document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 800;


class Player {
	constructor() {
		this.x = 200;
		this.y = 200;
		this.spriteWidth = 440;
		this.spriteHeight = 522;
		this.width = this.spriteWidth/5;
		this.height = this.spriteHeight/5;
		this.image = playerImage;
		this.frame = 0;
		this.interval = 20;
		this.frameInterval = 0;
		this.velocityPlayer = 5;
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

class InputHandler {
	
	constructor() {

		this.keys = [];

		window.addEventListener('keydown', e => {
	
			if( (e.key === "ArrowUp"    ||
				 e.key === "ArrowDown"  || 
				 e.key === "ArrowLeft"  || 
				 e.key === "ArrowRight" ) &&
				 this.keys.indexOf(e.key) === -1  ) {
				this.keys.push(e.key);

			}
			console.log(this.keys);
		});

		window.addEventListener('keyup', e => {
			if ( e.key === "ArrowUp"    ||
				 e.key === "ArrowDown"  ||
				 e.key === "ArrowLeft"  ||
				 e.key === "ArrowRight"
				) {
				this.keys.splice(e.key, 1);
			}
			console.log(this.keys);
		});
	}
}

const player = new Player();
const inputHandler = new InputHandler;

let lastTime = 1;

function animate(timeStamp) {
	const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	player.update(deltaTime,inputHandler);
	player.draw();
	requestAnimationFrame(animate);
}

animate(0);