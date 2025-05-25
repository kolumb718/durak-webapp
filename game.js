const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];

function startGame() {
  generateDeck();
  shuffle(deck);
  let player = deck.splice(0, 6);
  let bot = deck.splice(0, 6);
  let trump = deck.pop();
  showCards(player, 'Ваши карты');
  showCards([trump], 'Козырь:');
}

function generateDeck() {
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showCards(cards, label) {
  const gameArea = document.getElementById('gameArea');
  const section = document.createElement('div');
  section.innerHTML = `<h2>${label}</h2>`;
  for (let card of cards) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerText = card.rank + card.suit;
    section.appendChild(div);
  }
  gameArea.appendChild(section);
}
