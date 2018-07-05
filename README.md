# Memory Game Project

## Table of Contents

* [Introduction](#introduction)
* [Game Criteria](#game-criteria)

## Introduction

This application is an implementation of a simple version of the game __Concentration__.  The game board consists of 16 cards arranged in a grid.  The deck is made up of 8 different pairs of cards, each with a different symbol on one side.  The cards are randomly arraged on the the grid with the symbol face down.  On each turn, the player flips over 2 cards at a time to find matching cards.  

The game must satisfy 6 criteria
- [Memory game logic](#memory-game-logic)
- [Congratulations popup](#congratulations-popup)
- [Restart button](#restart-button)
- [Star rating](#star-rating)
- [Timer](#timer)
- [Move counter](#move-counter)

These criteria are described in the next section

## Game Criteria

### Memory Game Logic

The deck is shuffled and presented to the user as a 4x4 grid.  The player clicks on a card to turn it over and reveal it's symbol.

The shuffling implementation is taken from <http://stackoverflow.com/a/2450976>

The cards are displayed by using HTML classes.  The back of the card is shown by adding the classes *open* and *show* to its classList as shown here:
`card.classList.add('open', 'show');`
If the cards don't match, the 2 cards are flipped back after 1 second by removing the 2 classes. 

If the cards match, their backgrounds change color by adding *match* to the classList.

Matches are determined by using the HTML *data-\** attribute.  When the board is created, each card's data-image attribute is set to the image on the back of the card like this

`<li class="card" data-image="${card}">` 

where `${card}` is the name of the image.  Then the match is performed simply with this 1-line test

`if (openCards[0].dataset.image == openCards[1].dataset.image)`



### Congratulations Popup

When all matches have been found, a modal appears to congratulate the user.  The popup also displays the number of moves made, the elapsed time of the game and the final star rating.  There is also a button the user can press to start a new game.  The modal was implemented using Bootstrap.

### Restart Button

Above the game board is a score panel displays a star rating, a move counter, a timer, and a restart button.  When the restart button is pressed, everything is initialized and the user is presented with a new gameboard and score panel.

### Star Rating

The score panel contains 1 to 3 stars indicating the *star rating* of the player.  One star is removed after 30 moves and a second star is removed after 50 moves.  This is implemented in the code by removing *fa-star* from the classList like this `document.querySelector('.fa-star').classList.remove('fa-star');`

### Timer

The timer starts when the game begins and stops when all pairs have been found.  The timer is implemented using setInterval.  Each second, the elapsed time is converted into minutes and seconds and pasted into the score panel with this code: `document.getElementById("timer").innerText`.

### Move Counter

The score panel displays the number of moves the player has made by pasting that number into the score panel with code similar to that used for displaying the elapsed time.