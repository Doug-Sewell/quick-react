let score1 = 0;
let score2 = 0;

//Targets the page's modal on page load
const introButton = document.getElementById('game-start');

//Initiates the game.
introButton.addEventListener('click', (e) => {
    startGame();
});

const startGame = () => {
    //Hides intro screen
    hideIntroModal();

    //Rounds up between 1 and 10 seconds
    let milliseconds = Math.ceil(Math.random() * 10000);


    //Executes based on milliseconds
    setTimeout(() => {

        sides[0].style.backgroundColor = 'blue';
        sides[1].style.backgroundColor = 'red';

        document.getElementById('one').addEventListener('click', playerOneClickHandler);
        document.getElementById('two').addEventListener('click', playerTwoClickHandler);

        console.log(`Score 1: ${score1} and Score 2: ${score2}`);
    }, milliseconds);

    let sides = document.querySelectorAll('.side');
}

const playerOneClickHandler = () => {
    score1++;
    displayWinner(1);
    console.log(`Player One wins! Score is ${score1}`);
}

const playerTwoClickHandler = () => {
    score2++;
    console.log(`Player Two wins! Score is ${score2}`);
    displayWinner(2);
}

const hideIntroModal = () => {
    document.getElementById('modal-intro').style.display = 'none';
}

const hideResultsModal = () => {
    document.getElementById('results-board').style.display = 'none';
}

const displayWinner = num => {
    const resultsModal = document.getElementById('results-board');

    resultsModal.style.display = 'flex';
    resultsModal.innerHTML = `
    <div class="modal">
        <div class="modal-component">
            <h1>Player ${num} Wins!</h1>
            <h3>Player 1 Score: ${score1} | Player 2 Score: ${score2}</h3>
        </div>
        <div id="initiate-round-btn" class="modal-component">
            <h2>Play Again!</h2>
        </div>
    </div>`;
    document.getElementById('initiate-round-btn').addEventListener('click', e => {
        boardReset();
        startGame();
    });
}

const boardReset = () => {
    console.log('reset activated');
    document.getElementById('one').removeEventListener('click', playerOneClickHandler);
    document.getElementById('two').removeEventListener('click', playerTwoClickHandler);
    document.getElementById('one').style.backgroundColor = '#d3d3d3';
    document.getElementById('two').style.backgroundColor = 'white';
    hideResultsModal();
}

/*
TODO:
- Optimize/organize code. More Separation of Concerns
- Allow user to set the potential amount of seconds it could take up to for the board to get active.
- Add logic to remove a point if a user is too early with pressong on their side
- Implement keyboard events for desktop play
- Add instructions for users.
*/
