/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
// openCards is used to keep track of the 2 cards selected during a turn
let openCards = [];
let cardsMatch = false; // Flag to indicate if selected cards match
let cards = document.querySelectorAll(".card");

// Card flipping
//  'open' class changes card's background color
//  'show' class causes icon to be displayed
cards.forEach(function(card){
    card.addEventListener('click', function(e) {
        if (openCards.length === 0) {
            card.classList.add('open','show');
            openCards.push(card);
        }  else if (openCards.length === 1) {
            card.classList.add('open','show');
            openCards.push(card);
            
            // 2 cards now open.  Close them after 5 seconds
            setTimeout(function (){
                openCards.forEach(function(card){
                    card.classList.remove('open','show');
                });// end openCards.forEach
                openCards.splice(0,2);
            }, // End timeout function
            5000); // end setTimeout
        }

    });// end addEventListener 'click'
})

function clickHandler(event) {
    let card = event.target;
    card.classList.add('open', 'show');
    if (openCards.length == 0) {
        openCards.push(card);
        console.log('card.classList = ' + card.classList);
    } else if (openCards.length == 1) {
        openCards.push(card);
        // 2 cards now selected.  Check for match

        console.log('Waiting 5 seconds now');
        // Wait 5 seconds and then hide cards
        setTimeout(revertCards(), 5000);

    }

}

function revertCards() {
    console.log('Inside revertCards');
    console.log('openCards = ' + openCards);
    openCards.forEach((card) => {
        card.classList.remove('open', 'show');
        //card.classList.remove('show');
    });
    openCards.splice(0, 2);
    console.log('openCards.length = ' + openCards.length);
}