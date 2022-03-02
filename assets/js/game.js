/*
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const types = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K']

let playerPoints = 0,
    computerPoints = 0;

// HTML references
const btnRequest = document.querySelector('#btnRequest')
const poitsHTML = document.querySelectorAll('small');

// This function creates a new deck
const createDeck = () => {
  for(let i = 2; i<= 10; i++) {
    for(let type of types) {
      deck.push(i + type);
    }
  }
  for(let type of types) {
    for(let spe of specials) {
      deck.push(spe + type)
    }
  }
  // console.log(deck);
  deck = _.shuffle(deck);
  return deck;
};

createDeck();

// This function allows you to take a new card
const takeCard = () => {
  if (deck.length === 0) throw 'There are no cards in the deck';
  card = deck.shift()
  return card;
};

// while(deck.length != 0) takeCard();
// takeCard();

const valueCard = (card) => {
  const value = card.substring(0, card.length - 1);

  // if(isNaN(value)) points = (value === 'A') ? 11 : 10;
  // else points = value * 1; // Convert the string to a number
  // console.log(points + 5);
  
  return (isNaN(value)) ?
         (value === 'A') ? 11 : 10
         : value * 1;

};

// Events
btnRequest.addEventListener('click', () => {
  const card = takeCard();
  playerPoints += valueCard(card);
  
  poitsHTML[0].innerHTML = playerPoints;
  console.log(playerPoints)

});
