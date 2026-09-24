/*
====================================
TARGET DATE
====================================

Month index starts from 0 in JS

January = 0
February = 1
...
September = 8

23 September 2026
*/

const targetDate = new Date(
    2026,
    8,
    23,
    0,
    0,
    0
);

/*
====================================
COUNTDOWN FUNCTION
====================================
*/

function updateCountdown(){

    const now = new Date();

    const difference =
        targetDate - now;

    // Countdown completed
    if(difference <= 0){

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    // Convert milliseconds
    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference %
            (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (difference %
            (1000 * 60 * 60))
            /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (difference %
            (1000 * 60))
            /
            1000
        );

    // Update HTML
    document.getElementById("days")
        .textContent = days;

    document.getElementById("hours")
        .textContent = String(hours)
        .padStart(2,"0");

    document.getElementById("minutes")
        .textContent = String(minutes)
        .padStart(2,"0");

    document.getElementById("seconds")
        .textContent = String(seconds)
        .padStart(2,"0");
}

/*
Run immediately
*/
updateCountdown();

/*
Run every second
*/
setInterval(updateCountdown,1000);