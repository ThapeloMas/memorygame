// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
        'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];

    const gameBoard = document.getElementById('game-board');
    let flippedCards = [];
    let matchedPairs = 0;

    // Shuffle cards
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    shuffle(cards);

    // Create card elements
    cards.forEach(letter => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = letter;
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${letter}</div>
        `;
        gameBoard.appendChild(card);
    });

    // Handle card flip
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flip')) {
            this.classList.add('flip');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    // Check if the two flipped cards match
    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;
        const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

        if (isMatch) {
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === cards.length / 2) {
                setTimeout(() => alert('You have won the Game!!!'), 500);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                flippedCards = [];
            }, 1000);
        }
    }

    // Add event listener to each card
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', flipCard);
    });
});
