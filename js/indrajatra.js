
/*
====================================
INDRA JATRA — SEPTEMBER COUNTDOWN
====================================

Counts down to 1 September every year.
No exact Jatra date is required.

Month index:
January = 0
September = 8
*/

// Get the next 1 September
function getNextSeptember() {
    const now = new Date();

    let year = now.getFullYear();

    // If September 1 has already arrived this year,
    // target September 1 of next year.
    const septemberStart = new Date(year, 8, 1, 0, 0, 0);

    if (now >= septemberStart) {
        year++;
    }

    return new Date(year, 8, 1, 0, 0, 0);
}

/*
====================================
COUNTDOWN FUNCTION
====================================
*/

function updateCountdown() {
    const now = new Date();
    const targetDate = getNextSeptember();

    const difference = targetDate - now;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

// Run immediately
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);

