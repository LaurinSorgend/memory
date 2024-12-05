const cards = document.querySelectorAll('.memory-card');
const win_dialog = document.getElementById("win_screen");
const restart_button = document.getElementById("win_button");
const front_face_imgs = document.querySelectorAll('.front-face');
const themes = ["animals", "winter"]
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let correct_cards = 0;

function flipCard() {
	if (lockBoard) return;
	this.classList.add('flip');
	if (!hasFlippedCard) {
	hasFlippedCard = true;
	firstCard = this;
	return;
	}
	if (this === firstCard) return;
	secondCard = this;
	
	checkForMatch();

 }

function won() {
	win_dialog.show();
	const duration = 7 * 1000,
	  animationEnd = Date.now() + duration,
	  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

	function randomInRange(min, max) {
	  return Math.random() * (max - min) + min;
	}

	const interval = setInterval(function() {
	  const timeLeft = animationEnd - Date.now();

	  if (timeLeft <= 0) {
		return clearInterval(interval);
	  }

	  const particleCount = 50 * (timeLeft / duration);

	  // since particles fall down, start a bit higher than random
	  confetti(
		Object.assign({}, defaults, {
		  particleCount,
		  origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
		})
	  );
	  confetti(
		Object.assign({}, defaults, {
		  particleCount,
		  origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
		})
	  );
	}, 250);
}

 function checkForMatch() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	isMatch ? disableCards() : unflipCards();
 }



 function disableCards() {
	correct_cards += 2;
	console.log(correct_cards);
	if (correct_cards == cards.length) won();
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
 }


 function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	}, 900);
	

 }

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
	
  });
}

function random_theme(){
	var theme = themes[Math.floor(Math.random()*themes.length)];
	front_face_imgs.forEach(img => {
		img.src = img.src.replace("placeholder", theme);
	})
}

function restart() {
	correct_cards = 0;
	win_dialog.close();
	cards.forEach(card => {
		card.addEventListener('click', flipCard);
		card.classList.remove('flip');
		})
	shuffle()
	random_theme()
}

shuffle();
random_theme()
win_button.addEventListener('click', restart);
cards.forEach(card => card.addEventListener('click', flipCard));