const ellapsed = document.getElementById("ellapsed");
const pedestrians = document.getElementById("pedestrians");
const lostTime = document.getElementById("lost-time");

const ellapsedTime = () => {
    const closingDate = new Date('8/13/2020');
    const now = new Date();
    return (now.getTime() - closingDate.getTime()) / 1000
};

const ellapsedTimeTimeUnits = (diffTime) => {
    const months = Math.floor(diffTime / (86400*30));
    diffTime -= months * 86400*30;

    const days = Math.floor(diffTime / 86400);
    diffTime -= days * 86400;

    const hours = Math.floor(diffTime / 3600) % 24;
    diffTime -= hours * 3600;

    const minutes = Math.floor(diffTime / 60) % 60;
    diffTime -= minutes * 60;

    const seconds = Math.floor(diffTime);
    return {
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
};

const formatEllapsedString = (delta) => {
    return `${delta.months} months ${delta.days} days ${delta.hours} hours ${delta.minutes} minutes ${delta.seconds} seconds`;
};

setInterval(() => {
    const seconds = ellapsedTime();
    const delta = ellapsedTimeTimeUnits(seconds);
    ellapsed.innerHTML = formatEllapsedString(delta);
    pedestrians.innerHTML = `${Math.floor(0.185185185*seconds).toLocaleString()} pedestrians and cyclists could not cross the bridge`;
    lostTime.innerHTML = 0;
}, 1000);