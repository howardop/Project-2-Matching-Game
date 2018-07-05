//Global variables
// Timer
let secondCounter = 0; // 
let gameTimer = null;

/*
 * Create a list that holds all of your cards
 */
let deck = ["fa-diamond", 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'
]

createNewDeck();

resetMatchGame();

/******************************************************************************/
/*                              Global Functions                              */
/******************************************************************************/
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function createNewDeck() {
    shuffle(deck);

    // Now create HTML for each card in deck, and add it to the new deck.  
    // Using HTML data-* attribute to identify image on each card  to make match 
    //   checking easer
    let newDeck = '';

    // Loop through each card to create its HTML and append each card's HTML to newDeck.
    // After loop completes, newDeck will be inserted into the DOM
    deck.forEach((card) => {
        // Added place-figure class because the bootstrap.min.css, added to support modals, moves the icons to the upper left corner.  place-figure is used to restore them to the center
        let newCard = `<li class="card" data-image="${card}"> <i class="fa ${card} place-figure"></i> </li>`;
        //console.log(newCard);
        newDeck += newCard;
    });

    /****************************************************************************** */
    /* The following code builds the new deck just like the forEach loop above, but
     *    uses map instead
    let deck2  = deck.map((card) => {
        let newCard = `<li class="card" data-image="${card}"> <i class="fa ${card}"></i> </li>`;
        console.log(newCard);
        return newCard;
    }
    );
    newDeck = deck2.join('');
    **********************************************************************************/

    // Put the deck just created into the proper spot in the DOM
    document.querySelector('ul.deck').innerHTML = newDeck;
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


function resetMatchGame() {
    // openCards is used to keep track of the 2 cards selected during a turn
    console.log('Entered resetMatchGame');
    let openCards = [];
    let cardsMatch = false; // Flag to indicate if selected cards match
    let cards = document.querySelectorAll(".card");
    let matches = 0;
    let moves = 0;
    const moveCounterTag = document.querySelector('.moves');
    moveCounterTag.innerText = moves;
    document.getElementById("timer").innerText = '0:00';
    gameTimer = setInterval(myTimer, 1000);

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
                // 1st card selected
                card.classList.add('open', 'show');
                moveCounterTag.innerText = ++moves;
                openCards.push(card);
            } else if (openCards.length === 1) {
                // 2nd card selected
                card.classList.add('open', 'show');
                moveCounterTag.innerText = ++moves;
                openCards.push(card);
                // Check to see if any stars need to be removed
                //   Remove 1 after 30 moves
                //   Remove the 2nd after 50 moves
                //   Always keep 1 star
                // Eliminate star from view by removing fa-star class from element.  
                if (moves == 30 || moves == 50) {
                    document.querySelector('.fa-star').classList.remove('fa-star');
                };

                // Check for match using HTML data-* attribute              
                if (openCards[0].dataset.image == openCards[1].dataset.image) {
                    // Match!
                    openCards[0].classList.add('match');
                    openCards[1].classList.add('match');
                    matches += 1;
                    openCards = [];


                    // Check to see if all matches found
                    // If so, bring up congratulatory popup
                    if (matches == deck.length / 2) {
                        console.log('You win');
                        clearInterval(gameTimer);
                        let gameData = document.querySelector('.game-data');
                        gameData.innerHTML = `<h4>Number of moves = ${moves}</h4>
                        <h4>Elapsed Time = ${document.getElementById("timer").innerText}</h4><h4>Star Rating = ${document.querySelectorAll('.fa-star').length}</h4>`;
                        $("#myModal").modal();
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


// Manage the game timer
function myTimer() {
    secondCounter++;
    // Supposedly, (5+'') is faster than String(5) on Chrome for converting numbers to strings.
    let min = (Math.trunc(secondCounter / 60) + '');
    let sec = (secondCounter % 60 + '')
    document.getElementById("timer").innerText = min + ':' + sec.padStart(2, '0');
}

// Manage the Restart Game button
let restart = document.querySelector('.restart');
restart.addEventListener('click', function () {
    console.log('Restarting game');
    cards = null;
    clearInterval(gameTimer);
    secondCounter = 0;
    createNewDeck();
    resetMatchGame();
})

// Add event listener to "Play Again" button to create new game when Play Again button
// on congratulatory popup is clicked
document.querySelector('#newGame').addEventListener('click', function () {
    console.log('Play Again button pressed');
    cards = null;
    clearInterval(gameTimer);
    secondCounter = 0;
    createNewDeck();
    resetMatchGame();

})