
const suits = ["♠", "♣", "♥", "♦"];
const ranks = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = [];
let playerHand = [];
let botHand = [];
let trumpSuit = "";
let table = [];

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    shuffle(deck);
    trumpSuit = deck[deck.length - 1].suit;
    document.getElementById("trump").innerText = "Козырь: " + trumpSuit;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function dealCards() {
    playerHand = deck.splice(0, 6);
    botHand = deck.splice(0, 6);
    updateHands();
    updateDeckCount();
}

function updateHands() {
    const playerDiv = document.getElementById("player-hand");
    playerDiv.innerHTML = "";
    playerHand.forEach((card, index) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.innerText = card.rank + card.suit;
        cardDiv.onclick = () => playCard(index);
        playerDiv.appendChild(cardDiv);
    });

    const botDiv = document.getElementById("bot-hand");
    botDiv.innerHTML = "Карт у бота: " + botHand.length;
}

function updateDeckCount() {
    document.getElementById("deck-count").innerText = "Карт в колоде: " + deck.length;
}

function playCard(index) {
    const attackCard = playerHand.splice(index, 1)[0];
    table.push({ attacker: attackCard });
    const defenseCard = botRespond(attackCard);
    if (defenseCard) {
        table[table.length - 1].defender = defenseCard;
        logMessage("Бот отбился: " + defenseCard.rank + defenseCard.suit);
    } else {
        botHand.push(attackCard);
        logMessage("Бот взял карту: " + attackCard.rank + attackCard.suit);
    }
    updateHands();
    updateDeckCount();
}

function botRespond(attackCard) {
    for (let i = 0; i < botHand.length; i++) {
        const card = botHand[i];
        if (card.suit === attackCard.suit && rankBeats(card.rank, attackCard.rank)) {
            botHand.splice(i, 1);
            return card;
        } else if (card.suit === trumpSuit && attackCard.suit !== trumpSuit) {
            botHand.splice(i, 1);
            return card;
        }
    }
    return null;
}

function rankBeats(r1, r2) {
    return ranks.indexOf(r1) > ranks.indexOf(r2);
}

function logMessage(message) {
    const log = document.getElementById("log");
    const p = document.createElement("p");
    p.innerText = message;
    log.appendChild(p);
}

window.onload = () => {
    createDeck();
    dealCards();
};
