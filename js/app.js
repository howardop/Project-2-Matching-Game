/*
 * Create a list that holds all of your cards
 */
let deck = ["fa-diamond", 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',                           'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
                     'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
                     'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb']

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let template =  '<li class="card">' + 
'<i class="fa fa-bomb"></i>' + 
'</li>';

function createNewDeck() {
    shuffle(deck);

    // Now create HTML for each card in deck, and add it to the new deck.
    let newDeck = '';
    deck.forEach((card) => {
        let newCard = `<li class="card"> <i class="fa ${card}"></i> </li>`;
        console.log(newCard);
        newDeck += newCard;
    });

    // Put the deck just created into the proper spot in the DOM
    let ulDeck = document.querySelector('ul.deck');
    ulDeck.innerHTML=newDeck;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


createNewDeck();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// openCards is used to keep track of the 2 cards selected during a turn
let openCards = [];
let cardsMatch = false; // Flag to indicate if selected cards match
let cards = document.querySelectorAll(".card");

// Card flipping
//  'open' class changes card's background color
//  'show' class causes icon to be displayed
cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
        // First check if card has already been clicked on during this turn or already matched
        if ((card.classList.contains('open') && card.classList.contains('show')) ||
            card.classList.contains('match')) {
            // Card is already exposed.  Return
            return;
        }

        if (openCards.length === 0) {
            card.classList.add('open', 'show');
            openCards.push(card);
        } else if (openCards.length === 1) {
            card.classList.add('open', 'show');
            openCards.push(card);

            // Now need to check for match
            let image1 = getImage(openCards[0].querySelector('i'));
            console.log('image1 = ' + image1);
            let image2 = getImage(openCards[1].querySelector('i'));
            console.log('image2 = ' + image2);
            if (image1 == image2) {
                // Match!
                openCards[0].classList.add('match');
                openCards[1].classList.add('match');
                openCards.splice(0, 2);
            } else {

                // Cards don't match.  Close them after 5 seconds
                setTimeout(function () {
                        openCards.forEach(function (card) {
                            card.classList.remove('open', 'show');
                        }); // end openCards.forEach
                        openCards.splice(0, 2);
                    }, // End timeout function
                    1000); // end setTimeout
            }
        }

    }); // end addEventListener 'click'
})

// getImage gets the class name for the image in the card
function getImage(icon) {
    let classes = icon.classList;
    //Search classes array for class that begins with 'fa-' that is the image name
    for (let i = 0; i < classes.length; i++) {
        if (classes[i].search('fa-') >= 0) {
            return classes[i]
        }
    }
    return null;
}

// Reset game
let reset = document.querySelector('.restart');
reset.addEventListener('click', function() {
    openCards = [];
    cards = null;
    createNewDeck();
})