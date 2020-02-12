const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['nepali','hindi', 'javascript', 'application', 'websites'];

//Math.random generated numbeer from 0-1
// const random = Math.random();
// const floor = Math.floor(random * words.length);

let selectedWords = words[Math.floor(Math.random()*words.length)];


const correctLetters = [];

const wrongLetters = [];

//update wrong letter
const updateWrongLettersEl = () =>{
	
	//display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
	
	//figure handler display parts
	figureParts.forEach((part, index) =>{
		const errors = wrongLetters.length;
		
		if (index<errors){
			part.style.display='block'
		} else {
			part.style.display='none'
		}
	})
	
	//check if lost
	if (wrongLetters.length === figureParts.length){
		finalMessage.innerText = 'You Lost';
		popup.style.display = 'flex';
	}
};

//show notification function
const showNotification = () =>{
	notification.classList.add('show');
	setTimeout(()=>{
		notification.classList.remove('show');
	},2000)
};



const displayWord = () =>{
	wordEl.innerHTML=
			`${selectedWords
					.split('') //split will create aarray of letters so we cann map
					.map(letter=>`
			<span class="letter">
			${correctLetters.includes(letter)? letter : ''}
			</span>
			`).join('') //turing back to string
					}`;
	const innerWord = wordEl.innerText.replace(/\n/g, '');
	if (innerWord === selectedWords) {
		finalMessage.innerText = 'Congratulation You Won';
		popup.style.display = 'flex';
	}
};

//keydown letter press
window.addEventListener('keydown', e =>{
	const letter = e.key;
	if (e.keyCode >= 65 && e.keyCode <=90){
		
		if (selectedWords.includes(letter)){
			if(!correctLetters.includes(letter)){
				correctLetters.push(letter);
				displayWord();
			}else {
				showNotification();
			}
		} else {
		if(!wrongLetters.includes(letter)){
			wrongLetters.push(letter);
			updateWrongLettersEl()
		}else {
			showNotification();
		}
	}
}
});

//restart gaamme annd play again

playAgainBtn.addEventListener('click', ()=>{
	correctLetters.splice(0);
	wrongLetters.splice(0);
	selectedWords = words[Math.floor(Math.random() * words.length)]
	displayWord();
	updateWrongLettersEl();
	popup.style.display = 'none';
});

displayWord();
