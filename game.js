window.memory_playing = false;
function start_game() {
	if(!window.memory_playing) {
		window.user_turn = false;
		window.memory_playing = true;
		window.sequence = new Array();
		document.getElementById("main").style.opacity = "0";
		document.getElementById("game").style.display = "flex";
		window.game_difficulty = document.getElementById("difficulty").value;
		add_seq();
		add_seq();
		add_seq();
		populate(window.game_difficulty);
		setTimeout(function() {
			document.getElementById("main").style.display = "none";
			document.getElementById("game").style.opacity = "1";
			for(var i = 0; i < Math.pow(window.game_difficulty, 2); i++) {
				document.getElementById("slot"+i).setAttribute('class', 'slot');
			}
		}, 400);
		setTimeout(function() {
			for(var i = 0; i < Math.pow(window.game_difficulty, 2); i++) {
				document.getElementById("slot"+i).setAttribute('class', 'slot unclicked');
			}
		}, 1200);
		setTimeout(function() {
			play_seq(0);
		}, 1800);
	}
}
function populate(difficulty) {
	var container = document.getElementById("game");
	var slot;
	var row;
	for(var i = 0; i < difficulty; i++) {
		row = document.createElement("div");
		row.setAttribute('class', 'game_row');
		for(var j = difficulty*i; j < difficulty*(i+1); j++) {
			slot = document.createElement("input");
			slot.setAttribute('type', 'button');
			slot.setAttribute('class', 'slot');
			slot.setAttribute('style', 'background: rgb('
				+ Math.floor(Math.random() * 256) + ', '
				+ Math.floor(Math.random() * 256) + ', '
				+ Math.floor(Math.random() * 256) + ')');
			slot.setAttribute('id', 'slot'+j);
			slot.setAttribute('onClick', 'clicked('+j+')');
			row.appendChild(slot);
		}
		container.appendChild(row);
	}
}
function clicked(num) {
	if(!window.user_turn) {return 0;}
	highlight(num);
	if(num == window.sequence[window.user_progress]) {
		window.user_progress += 1;
		if(window.user_progress == window.sequence.length) {
			window.user_turn = false;
			win();
		}
	} else {
		window.user_turn = false;
		lose();
	}
}
function win() {
	setTimeout(function() {
		for(var i = 0; i < Math.pow(window.game_difficulty, 2); i++) {
			document.getElementById("slot"+i).setAttribute('class', 'slot won');
		}
	}, 800);
	setTimeout(function() {
		for(var i = 0; i < Math.pow(window.game_difficulty, 2); i++) {
			document.getElementById("slot"+i).setAttribute('class', 'slot unclicked');
		}
	}, 1600);
	setTimeout(function() {
		add_seq();
		play_seq(0);
	}, 2200);
}
function lose() {
	setTimeout(function() {
		for(var i = 0; i < Math.pow(window.game_difficulty, 2); i++) {
			document.getElementById("slot"+i).setAttribute('class', 'slot lost');
		}
	}, 800);
	setTimeout(function() {
		document.getElementById("game").style.opacity = 0;
		document.getElementById("main").style.display = "flex";
		document.getElementById("last_score").innerHTML =
			"you scored " + (window.sequence.length-3) + " on difficulty " + (window.game_difficulty-2);
		for(var i = 0; i < Math.pow(window.game_difficulty, 2); i++) {
			document.getElementById("slot"+i).setAttribute('class', 'slot unclicked');
		}
	}, 1600);
	setTimeout(function() {
		document.getElementById("game").style.display = "none";
		document.getElementById("main").style.opacity = 1;
		document.getElementById("game").innerHTML = "";
		window.memory_playing = false;
	}, 2400);
}
function highlight(num) {
	var slot = document.getElementById("slot" + num);
	slot.setAttribute('class', 'slot');
	setTimeout(function() {
		slot.setAttribute('class', 'slot unclicked');
	}, 500);
}
function add_seq() {
	window.sequence.push(Math.floor((Math.random() * Math.pow(window.game_difficulty, 2))));
	console.log(window.sequence);
}
function play_seq(index) {
	window.user_progress = 0;
	highlight(window.sequence[index]);
	if(index+1 < window.sequence.length) {
		setTimeout(function() {
			play_seq(index+1);
		}, 800);
	} else {
		setTimeout(function() {
			window.user_turn = true;
		}, 600);
	}
}