{
    let score1 = 0;
    let score2 = 0;
    let boardWillReact = true;

    //Initiates the game.
    document.getElementById('game-start').addEventListener('click', () => {
        startGame();
    });

    document.getElementById('game-instructions').addEventListener('click', () => {
        displayInstruction();
    });

    const startGame = () => {

        //Hides intro screen
        hideIntroModal();

        //Event handlers if user is too early.
        document.getElementById('one').addEventListener('click', playerOneEarlyClickHandler);
        document.getElementById('two').addEventListener('click', playerTwoEarlyClickHandler);
        document.addEventListener('keydown', typedEarlyTimeHandler);

        //Rounds up between 1 and 10 seconds for random amount of seconds between 1 and 10.
        let milliseconds = Math.ceil(Math.random() * 10000);


        //Executes based on milliseconds
        setTimeout(() => {
            if (boardWillReact) {
                //Removal of "too early" event handlers.
                document.getElementById('one').removeEventListener('click', playerOneEarlyClickHandler);
                document.getElementById('two').removeEventListener('click', playerTwoEarlyClickHandler);
                document.removeEventListener('keydown', typedEarlyTimeHandler);

                //UI update to let users know they can react.
                sides[0].style.backgroundColor = 'blue';
                sides[1].style.backgroundColor = 'red';

                //Creates event handlers for users to react.
                document.getElementById('one').addEventListener('click', playerOneClickHandler);
                document.getElementById('two').addEventListener('click', playerTwoClickHandler);
                document.addEventListener('keydown', typedOnTimeHandler);
            }
        }, milliseconds);

        let sides = document.querySelectorAll('.side');
    }

    //START EVENT HANDLERS
    //Too early handlers

    const playerOneEarlyClickHandler = () => {
        boardWillReact = false;
        score2++;
        displayEarlyWinner(1);
    }

    const playerTwoEarlyClickHandler = () => {
        boardWillReact = false;
        score1++;
        displayEarlyWinner(2);
    }

    const typedEarlyTimeHandler = (e) => {
        if (e.keyCode === 76) {
            boardWillReact = false;
            score1++;
            displayEarlyWinner(2);
        } else if (e.keyCode === 65) {
            boardWillReact = false;
            score2++;
            displayEarlyWinner(1);
        }

    }

    //On time handlers
    const typedOnTimeHandler = (e) => {
        if (e.keyCode === 65) {
            score1++;
            displayWinner(1);
        } else if (e.keyCode === 76) {
            score2++;
            displayWinner(2);
        }
    }

    const playerOneClickHandler = () => {
        score1++;
        displayWinner(1);
    }

    const playerTwoClickHandler = () => {
        score2++;
        displayWinner(2);
    }
    //END EVENT HANDLERS


    const hideIntroModal = () => {
        document.getElementById('modal-intro').style.display = 'none';
    }

    const hideResultsModal = () => {
        document.getElementById('results-board').style.display = 'none';
    }


    //Displays winner if executed after page changes color.
    const displayWinner = num => {
        const resultsModal = document.getElementById('results-board');

        resultsModal.style.display = 'flex';
        resultsModal.innerHTML = `
    <div class="modal">
        <div class="modal-component">
            <h1>Player ${num} Wins!</h1>
            <h3>Player 1 Score: ${score1} | Player 2 Score: ${score2}</h3>
        </div>
        <div class="modal-component">
            <h2 id="initiate-round-btn">Play Again!</h2>
        </div>
    </div>`;
        document.getElementById('one').removeEventListener('click', playerOneClickHandler);
        document.getElementById('two').removeEventListener('click', playerTwoClickHandler);
        document.removeEventListener('keydown', typedOnTimeHandler);

        document.getElementById('initiate-round-btn').addEventListener('click', e => {
            boardReset();
            startGame();
        });
    }


    //Displays winner if executing before page changes color.
    const displayEarlyWinner = num => {
        const resultsModal = document.getElementById('results-board');
        resultsModal.style.display = 'flex';
        resultsModal.innerHTML = `
    <div class="modal">
        <div class="modal-component">
            <h1>Player ${num} was too early. Other player gets a point!</h1>
            <h3>Player 1 Score: ${score1} | Player 2 Score: ${score2}</h3>
        </div>
        <div class="modal-component">
            <h2 id="initiate-round-btn">Play Again!</h2>
        </div>
    </div>`;
        document.getElementById('one').removeEventListener('click', playerOneEarlyClickHandler);
        document.getElementById('two').removeEventListener('click', playerTwoEarlyClickHandler);
        document.removeEventListener('keydown', typedEarlyTimeHandler);

        document.getElementById('initiate-round-btn').addEventListener('click', e => {
            boardReset();
            startGame();
        });
    }

    const displayInstruction = () => {
        hideIntroModal();
        const resultsModal = document.getElementById('results-board');
        resultsModal.style.display = 'flex';
        resultsModal.innerHTML = `
            <div class="modal">
                <div class="modal-component">
                    <h1>How to Play</h1>
                    <p>Once you press the play button, between one and ten seconds at random, the board will change
                    color. (One side red, the other side blue.) On smaller devices, play across from each other.</p>
                    <p>The first player to react by pressing on their respective side on their phone/tablet will get the point!</p>
                <p>If playing on a laptop or desktop computer, instead of pressing the display, press the letter "A" on your
                    keyboard for player one. Player two is the letter "L". Think of your keyboard keys as a buzzer!</p>
                <p>Don't press your side of the screen or your keyboard key too early! If you do, the other player
                    gets a point.</p>
                </div>
                <div class="modal-component">
                    <h2 id="close-instructions">Play!</h2>
                </div>
            </div>`;
        document.getElementById('close-instructions').addEventListener('click',() => {
            hideResultsModal();
            startGame();
        })
    }

    //Resets color of the board, sets board behavior back to default. Hides the results modal.
    const boardReset = () => {
        boardWillReact = true;
        document.getElementById('one').style.backgroundColor = '#d3d3d3';
        document.getElementById('two').style.backgroundColor = 'white';
        hideResultsModal();
    }
}

/*
TODO:
- Add instructions for users.
*/

