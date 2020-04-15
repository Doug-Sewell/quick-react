
//Targets the page's modal on page load
const introButton = document.getElementById('game-start');

//Initiates the game.
introButton.addEventListener('click', (e) => {
    startGame();
});



const startGame = () => {
    //Hides intro screen
    hideIntroModal();


    let score1 = 0;
    let score2 = 0;

    //Rounds up between 1 and 10 seconds
    let milliseconds = Math.ceil(Math.random() * 10000);


    //Executes based on milliseconds
    setTimeout(() => {
        sides = Array.from(sides);
        sides[0].style.backgroundColor = 'blue';
        sides[1].style.backgroundColor = 'red';

        sides.forEach((side, index) => {
            side.addEventListener('click', (e) => {
                if (index == 0) {
                    score1++;
                    console.log(`Player One wins! Score is ${score1}`);
                    reset();
                } else {
                    score2++;
                    console.log(`Player Two wins! Score is ${score2}`);
                    reset();
                }
            })
        });
        console.log(`Score 1: ${score1} and Score 2: ${score2}`);
    }, 500); //CHANGE THIS TO MILLISECONDS

    let sides = document.querySelectorAll('.side');
}

const hideIntroModal = () => {
    document.getElementById('modal-intro').style.display = 'none';
}

const reset = () => {
    console.log('reset activated');
    document.getElementById('results-board').style.display = 'flex';
    document.getElementById('modal-intro').style.display = 'flex';

}

/*
TODO:
THe results modal is within modal-intro. We need to deparate that because you cannot
use display:none on modal-intro without it hiding the results-board as well.
Line 56 was used to highlight this point for now. Commenting it out breaks the app.
Make the modal and backdrop two different components in the HTML.
*/