/*
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const types = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K']

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
  console.log(deck);
  return deck;
};

createDeck();

// This function allows you to take a new card
const takeCard = () => {
  if (deck.length === 0) throw 'There are no cards in the deck';

  card = deck.shift()
  console.log(card);
  console.log(deck);

  return card;
};

// while(deck.length != 0) takeCard();
// takeCard();
