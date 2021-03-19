const wordEle = document.getElementById('word');
const wrongLettersEle = document.getElementById('wrong__letters');
const playAgainBtn = document.getElementById('play__button');
const notification = document.getElementById('notification__container');
const popup = document.getElementById('popup__container');
const finalMessage = document.getElementById('final__message');

const figureParts = document.querySelectorAll('.figure__part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEle.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `
            )
            
        .join('')}
    `;

    const innerWord = wordEle.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won! 😎';
        popup.style.display = 'flex';
    }
}

function updateWrongLetterEle() {
    wrongLettersEle.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length == figureParts.length) {
        finalMessage.innerText = 'You Lost 😥';
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }
            else {
                showNotification();
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetterEle();
            }
            else {
                showNotification();
            }
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLetterEle();
    popup.style.display = 'none';
});

displayWord();