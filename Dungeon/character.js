function Torch(){
		this.IMAGE = "torch.png";
		this.SIZE = 256;
		this.COLUMN = 4;
		this.currentFrame = 0;
		this.sourceX = 4 * this.SIZE;
		this.destX = player.destX+5;
		this.destY = player.destY-57;
		this.burnt = false;
	}
	Torch.prototype.burn = function(){
		this.sourceX = Math.floor(this.currentFrame % this.COLUMN) * this.SIZE;
		this.currentFrame++;
	}
	function Character(){
		this.IMAGE = "walk.png";
		this.SIZE = 63.8;
		this.sourceX = 0;
		this.sourceY = 0;
		this.destX = 500;
		this.destY = 500;
		this.COLUMN = 9;
		this.speed = 7;
		this.numberOfFrames = 8;
		this.currentFrame = 0;
		this.UP = 0;
		this.DOWN = 1;
		this.LEFT = 2;
		this.RIGHT = 3;
		this.direction = [false, false, false, false];
	}
	Character.prototype.move = function(){
		if(this.direction[this.UP]){
			this.sourceX = Math.floor(this.currentFrame % this.COLUMN) * this.SIZE;
			this.sourceY = 0 * this.SIZE;
			bg.sourceY-=this.speed;
			if(bg.sourceY < 1){
				this.speed = 0;
			}
		} else if(this.direction[this.DOWN]){
			this.sourceX = Math.floor(this.currentFrame % this.COLUMN) * this.SIZE;
			this.sourceY = 2 * this.SIZE;
			this.speed = 7;
			bg.sourceY+=this.speed;
			if(bg.sourceY > 1390){
				this.speed = 0;
			}
		} else if(this.direction[this.LEFT]){
			this.sourceX = Math.floor(this.currentFrame % this.COLUMN) * this.SIZE;
			this.sourceY = 1 * this.SIZE;
			this.speed = 7;
			bg.sourceX-=this.speed;
			if(bg.sourceX < 1){
				this.speed = 0;
			}
		} else if(this.direction[this.RIGHT]){
			this.sourceX = Math.floor(this.currentFrame % this.COLUMN) * this.SIZE;
			this.sourceY = 3 * this.SIZE;
			this.speed = 7;
			bg.sourceX+=this.speed;
			if(bg.sourceX > 1000){
				this.speed = 0;
			}
		}
		if(this.currentFrame < this.numberOfFrames){
			this.currentFrame++;
		} else {
			this.currentFrame = 0;
		}
	}
	function Background(){
		this.IMAGE = "bg.png";
		this.SIZE = 2000;
		this.sourceX = 0;
		this.sourceY = 0;
	}



	var player = new Character();
	var bg = new Background();
	var torchAnim = new Torch();

	window.addEventListener("keydown", keydownHandler, false);
	window.addEventListener("dblclick", burnTorch, false);

	function keydownHandler(event){
		if(event.keyCode === 38){
			player.direction[player.UP] = true;
			player.direction[player.DOWN] = false;
			player.direction[player.LEFT] = false;
			player.direction[player.RIGHT] = false;
		} else if(event.keyCode === 37){
			player.direction[player.UP] = false;
			player.direction[player.DOWN] = false;
			player.direction[player.LEFT] = true;
			player.direction[player.RIGHT] = false;
		} else if(event.keyCode === 39){
			player.direction[player.UP] = false;
			player.direction[player.DOWN] = false;
			player.direction[player.LEFT] = false;
			player.direction[player.RIGHT] = true;
		}else if(event.keyCode === 40){
			player.direction[player.UP] = false;
			player.direction[player.DOWN] = true;
			player.direction[player.LEFT] = false;
			player.direction[player.RIGHT] = false;
		}
		updateAnimation();
	}
	function burnTorch(event){
		if((event.clientX>(player.destX)) && (event.clientX<(player.destX+64)) && (event.clientY>(player.destY)) && (event.clientY<(player.destY+100))){
			setInterval(burn, 200);
			torchAnim.burnt = true;
		}
	}
	

	var canvas = document.querySelector("canvas");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	var surface = canvas.getContext("2d");
	var character = new Image();
	character.addEventListener("load", keydownHandler, false);
	character.src = player.IMAGE;
	var background = new Image();
	var torch = new Image();
	torch.addEventListener("load", torchAnim.burn, false);
	torch.src = torchAnim.IMAGE;
	background.addEventListener("load", keydownHandler, false);
	background.src = bg.IMAGE;


	function updateAnimation(){
		player.move();
		render();
	}
	function burn(){
		torchAnim.burn();
		render();
	}

	

	function render(){
		surface.clearRect(0, 0, canvas.width, canvas.height);

		surface.drawImage(background, bg.sourceX, bg.sourceX, bg.SIZE, bg.SIZE, 0, 0, canvas.width, canvas.height);

		surface.drawImage(torch, torchAnim.sourceX, 0, torchAnim.SIZE, torchAnim.SIZE, torchAnim.destX, torchAnim.destY, torchAnim.SIZE/2, torchAnim.SIZE/2);
		surface.drawImage(character, player.sourceX, player.sourceY, player.SIZE, player.SIZE, player.destX, player.destY, player.SIZE * 2, player.SIZE* 2);
	}