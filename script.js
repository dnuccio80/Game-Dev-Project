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
		this.width = this.spriteWidth/4;
		this.height = this.spriteHeight/4;
		this.image = playerImage;
		this.frame = 0;
		this.interval = 20;
		this.frameInterval = 0;
	}

	update(deltaTime) {
		this.frameInterval += deltaTime;
		if(this.frameInterval >= this.interval) {
			this.frame<15 ? this.frame++ : this.frame = 0;
			this.frameInterval = 0;
		} 
	}

	draw() {
		// ctx.fillRect(this.x, this.y, this.width, this.height)
		// 							sx,sy,sw,sh,dx,dy,dw,dh
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0 , this.spriteWidth, this.spriteHeight,
			this.x, this.y, this.width, this.height )
	}
}

const player = new Player();

let lastTime = 1;

function animate(timeStamp) {
	const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	player.update(deltaTime);
	player.draw();
	requestAnimationFrame(animate);
}

animate(0);