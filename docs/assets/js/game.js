/*
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

const myModule = (() => {
  'use strict';
  let deck = [];
  const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];
    
  let playerPoints = [];

  // HTML references
  const btnNew = document.querySelector('#btnNew'),
        btnRequest = document.querySelector('#btnRequest'),
        btnStop = document.querySelector('#btnStop');

  const divCardsPlayers = document.querySelectorAll('.divCards'),
        poitsHTML = document.querySelectorAll('small');

  const startGame = (numberPlayers = 2) => {
    deck = createDeck()
    playerPoints = [];
    for(let i = 0; i < numberPlayers; i++ ) playerPoints.push(0);
    
    poitsHTML.forEach(element => element.innerText = 0);
    divCardsPlayers.forEach(element => element.innerHTML = '');

    btnRequest.disabled = false;
    btnStop.disabled = false;

  };

  // This function creates a new deck
  const createDeck = () => {
    deck = [];
    for(let i = 2; i<= 10; i++) {
      for(let type of types) deck.push(i + type);
    }
    for(let type of types) {
      for(let spe of specials) deck.push(spe + type);
    }
    return _.shuffle(deck);
  };

  // This function allows you to take a new card
  const takeCard = () => {
    if (deck.length === 0) throw 'There are no cards in the deck';
    return deck.shift();;
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

  // Turn 0: Player and last shift computer
  const accumulatePoints = (card, turn) => {
    playerPoints[turn] += valueCard(card);
    poitsHTML[turn].innerHTML = playerPoints[turn];
    return playerPoints[turn];
  };
  
  const createCard = (card, turn) => {
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.alt = card;
    imgCard.classList.add('cardD');
    divCardsPlayers[turn].append(imgCard);
  };
  
  const determineWinner = () => {
    const [minimumPoints, computerPoints] = playerPoints;
    setTimeout(() => {
    if(computerPoints === minimumPoints) alert('Nobody wins :(');
    else if (playerPoints > 21 ) alert('Computer wins');
    else if(computerPoints > 21) alert('Player wins');
    else alert('Computer wins');
  }, 10);
  };

  // Computer turn
  const computerTurn = (minimumPoints) => {
    let computerPoints = 0;
    do {
      const card = takeCard();
      computerPoints = accumulatePoints(card, playerPoints.length - 1);
      
      createCard(card, playerPoints.length - 1);

    } while((computerPoints < minimumPoints) && (minimumPoints <= 21));

    determineWinner();

  };
  
  // Events
  btnRequest.addEventListener('click', () => {
    const card = takeCard();
    const playerPoints = accumulatePoints(card, 0);

    createCard(card, 0);
        
    if(playerPoints > 21) {
      console.log('You lost');
      btnRequest.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
  
    } else if(playerPoints === 21) {
      console.log('21. Great!');
      btnRequest.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    }
  
  });
  
  btnStop.addEventListener('click', () => {
    btnRequest.disabled = true;
    btnStop.disabled = true;
  
    computerTurn(playerPoints);
  
  });
  
  // btnNew.addEventListener('click', () => {
  //  startGame();
  // });

  return { newGame: startGame };
})();
