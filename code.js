let score1 = 0;
let score2 = 0;


let milliseconds = Math.ceil(Math.random() * 10000);

setTimeout(() => {
    sides = Array.from(sides);
    // sides[0].style.backgroundColor='red';
    // sides[1].style.backgroundColor='blue';

    sides.forEach((side, index) => {
        side.addEventListener('click', (e) => {
            if (index == 0) {
                score1++;
            } else {
                score2++;
            }
        })
    });
    console.log(`Score 1: ${score1} and Score 2: ${score2}`);
}, milliseconds);

let sides = document.querySelectorAll('.side');