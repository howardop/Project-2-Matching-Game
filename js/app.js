/*
 * Create a list that holds all of your cards
 */
let deck = ["fa-diamond", 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'
]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function createNewDeck() {
    shuffle(deck);

    // Now create HTML for each card in deck, and add it to the new deck.  Using HTML // data-* attribute for image to make match checking easer
    let newDeck = '';

    deck.forEach((card) => {
        let newCard = `<li class="card" data-image="${card}"> <i class="fa ${card}"></i> </li>`;
        //console.log(newCard);
        newDeck += newCard;
    });

    /* The following code builds the new deck just like the forEach loop above, but
     *    uses map instead
    let deck2  = deck.map((card) => {
        let newCard = `<li class="card" data-image="${card}"> <i class="fa ${card}"></i> </li>`;
        console.log(newCard);
        return newCard;
    }
    );
    newDeck = deck2.join('');
    */

    // Put the deck just created into the proper spot in the DOM
    let ulDeck = document.querySelector('ul.deck');
    ulDeck.innerHTML = newDeck;
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
resetMatchGame();

function resetMatchGame() {
    // openCards is used to keep track of the 2 cards selected during a turn
    let openCards = [];
    let cardsMatch = false; // Flag to indicate if selected cards match
    let cards = document.querySelectorAll(".card");
    let matches = 0;
    let moves = 0;
    const moveCounterTag = document.querySelector('.moves');
    moveCounterTag.innerText = moves;

    // Add 3 stars to score panel
    const threeStars = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    document.querySelector('.stars').innerHTML = threeStars;


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
                moveCounterTag.innerText = ++moves;
                openCards.push(card);
            } else if (openCards.length === 1) {
                card.classList.add('open', 'show');
                moveCounterTag.innerText = ++moves;
                openCards.push(card);
                // Check to see if any stars need to be removed
                //   Remove 1 after 10 moves
                //   Remove the 2nd after 20 moves
                //   Always keep 1 star
                if (moves == 20 || moves == 40) {
                    document.querySelector('.fa-star').classList.remove('fa-star');
                };

                // Now need to check for match using HTML data-* attribute              
                if (openCards[0].dataset.image == openCards[1].dataset.image) {
                    // Match!
                    openCards[0].classList.add('match');
                    openCards[1].classList.add('match');
                    matches += 1;
                    openCards = [];


                    // Check to see if all matches found
                    if (matches == deck.length / 2) {
                        alert('You Win!!!!');
                    }
                } else {
                    // Cards don't match.  Close them after 1 seconds
                    setTimeout(function () {
                            openCards.forEach(function (card) {
                                card.classList.remove('open', 'show');
                            }); // end openCards.forEach
                            openCards = [];
                        }, // End timeout function
                        1000); // end setTimeout
                }
            }

        }); // end addEventListener 'click'
    })
}

// Timer
let counter = 0;
let gameTimer = setInterval(myTimer, 1000);

function myTimer() {
    counter++;
    // Supposedly, (5+'') is faster than String(5) on Chrome for converting numbers to strings.
    let min=(Math.trunc(counter/60)+ '');
    let sec=(counter%60 + '')
    document.getElementById("timer").innerText = min + ':' + sec.padStart(2,'0');
}

// Restart game
let restart = document.querySelector('.restart');
restart.addEventListener('click', function () {
    console.log('Restarting game');
    openCards = [];
    cards = null;
    clearInterval(gameTimer);
    createNewDeck();
    resetMatchGame();
})