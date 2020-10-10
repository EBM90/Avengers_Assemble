const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minEl = document.getElementById('min');
const secEl = document.getElementById('sec');

const firstDay = '07 May 2021 00:00';

function countdown() {
    const currentDay = new Date();
    const firstDayHack = new Date(firstDay);

    const totalSeconds = (firstDayHack - currentDay) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);

    const hours = Math.floor(totalSeconds / 3600) % 24;

    const minutes = Math.floor(totalSeconds / 60) % 60;

    const seconds = Math.floor(totalSeconds % 60);

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minEl.innerHTML = minutes;
    secEl.innerHTML = seconds;

}

countdown();
setInterval(countdown, 1000)