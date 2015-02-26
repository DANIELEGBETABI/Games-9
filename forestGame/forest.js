var map = [
	"The majestic Death Star",
	"Jabba the Hut's palace.",
	"Desert Planet Tatooine.",
	"The Chancellor's office",
	"Peaceful Naboo.",
	"Nice music playing in the Cantina",
	"The glorious Jedi Temple",
	"The Imperial Center Coruscant",
	"World of murky swamps, steaming bayous, and petrified forests, Dagobah"
	];
	var mapNames = ["Death Star", "Jabba's Place", "Tatooine", "Chancellor's Office", "Naboo", "The Cantina", "Jedi Temple", "Coruscant", "Dagobah"];
	var locations = [
		"deathstar.jpg",
		"jabbaspalace.jpg",
		"tatooine.jpg",
		"chancellorsoffice.JPG",
		"naboo.jpg",
		"thecantina.jpg",
		"jeditemple.png",
		"coruscant.jpg",
		"dagobah.jpg"
	];
	var blockedMessages = [
		"It's too dangerous to move that way.",
		"A mysterious force holds you back",
		"A tangle of thorns blocks your way",
		"You can't step over the alien",
		"",
		"The gate locks shut",
		"The river is too deep to cross",
		"The trees are too thick to pass",
		"You're too scared to go that way"
	];
	var item = "";
	var itemsIknow = ["blaster", "lightsaber", "detonator", "flute", "robe", "belt"];
	var items = ["blaster", "lightsaber", "detonator", "flute", "robe", "belt"];
	var itemLocations = [1, 3, 4, 5, 6, 6];
	var inventory = [];
	var armor = 0;

	var mapLocation = 4;

	var output = document.querySelector("#output");
	var input = document.querySelector("#input");
	var button = document.querySelector("button");
	var place = document.querySelector("#place");
	var itemImg = document.querySelector("#item");

	button.addEventListener("click", clickHandler, false);
	window.addEventListener("keydown", keyDownHandler, false);
	var actions = ["west", "east", "north", "south", "use", "drop", "take"];
	var action = "";
	var status = "";
	var playerInput = "";

	render();

	function clickHandler(){
		validate();
	}
	function keyDownHandler(event){
		if(event.keyCode == 13){
			validate();
		}
	}

	function validate(){
		playerInput = input.value.toLowerCase();
		for(i=0;i<actions.length;i++){
			if(playerInput.indexOf(actions[i]) !== -1){
				status = "";
				action = actions[i];
				console.log(action);
				break;
			}
		}
		for(i=0;i<itemsIknow.length;i++){
			if(playerInput.indexOf(itemsIknow[i]) !== -1){
				item = itemsIknow[i];
				console.log(item);
			}
		}
		playGame();
	}

	function go(direc){
		action = direc;
		playGame();
	}
	function playGame(){
		switch(action){
			case 'north':
				if(mapLocation >= 3) mapLocation -= 3; else status = blockedMessages[mapLocation];
				break;
			case 'south':
				if(mapLocation+3 < map.length) mapLocation += 3; else status = blockedMessages[mapLocation];
				break;
			case 'west':
				if(mapLocation % 3 !== 0) mapLocation--; else status = blockedMessages[mapLocation];
				break;
			case 'east':
				if(mapLocation % 3 !== 2) mapLocation++; else status = blockedMessages[mapLocation];
				break;
			case 'take':
				takeItem();
				break;
			case 'use':
				useItem();
				break;
			case 'drop':
				dropItem();
				break;
			default:
				status = "I don't quite understand that, Sir.";
		}
		render();
	}
	function getImage(img){
	    var name = img.src;
		item = name.substring(name.lastIndexOf("/")+1,name.lastIndexOf(".png"));
		takeItem();
		render();
	}
	function takeItem(){
		var itemIndexNumber = items.indexOf(item);
		if(itemIndexNumber > -1 && itemLocations[itemIndexNumber] === mapLocation){
			status = "You take the " + item;
			inventory.push(item);
			items.splice(itemIndexNumber,1);
			itemLocations.splice(itemIndexNumber,1);
		} else {
			status = "You can't do that";
		}
	}
	function dropItem(){
		if(inventory.length > 0){
			var inventoryIndex = inventory.indexOf(item);
			if(inventoryIndex > -1){
				status = "You drop the " + item;
				items.push(inventory[inventoryIndex]);
				itemLocations.push(mapLocation);
				inventory.splice(inventoryIndex, 1);
			} else {
				status = "You can't do that.";
			}
		}
	}
	function useItem(){
		var inventoryIndex = inventory.indexOf(item);
		if(inventory.length === 0){
			status += "Your inventory is empty";
		}
		if(inventoryIndex === -1){
			status = "You're not carrying it.";
		} else {
			switch(item){
				case "flute":
					status = "Beutiful music fills the air.";
					break;
				case "lightsaber":
					if(mapLocation === 6){
						status = "You swing the lightsaber and slay the jedi kids.";
					} else {
						status = "You swing the lightsaber listlessly.";
					}
					break;
				case "robe":
					armor += 10;
					status = "You wear the robe. Now your armor is " + armor;
					break;
				case "belt":
					armor += 5;
					status = "You wear the belt. Now your armor is " + armor;
					break;
				case "detonator":
					status = "You bombed the " + mapNames[mapLocation];
					inventory.splice(inventoryIndex,1);
					break;
				case "blaster":
					status = "You fired your blaster in " + mapNames[mapLocation];
					break;
			}
		}

	}

	
	function render(){
		output.innerHTML = map[mapLocation];
		place.src = "images/"+locations[mapLocation];


		for(var i=0;i<itemsIknow.length;i++){
			if(mapLocation === itemLocations[i]){
				output.innerHTML += "<br>You see a <strong>"+itemsIknow[i]+"</strong> here.";
			}
		}

		if(inventory.length !== 0){
			output.innerHTML += "<br>You are carrying: " + inventory.join(", ");
		}

		if(itemLocations.indexOf(mapLocation) > -1){
			itemImg.src = "images/"+items[itemLocations.indexOf(mapLocation)]+".png";
			itemImg.style.visibility = 'visible';
		} else {
			itemImg.style.visibility = 'hidden';
		}
		
		itemImg.style.top = Math.floor(Math.random()*(place.height-itemImg.height))+"px";
		itemImg.style.left = Math.floor(Math.random()*(300-itemImg.width))+"px";
		output.innerHTML += "<br /><em>" + status + "</em>";
	}