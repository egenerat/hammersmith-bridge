const ellapsedVehicles = document.getElementById("ellapsed-vehicles");
const ellapsedPedestrians = document.getElementById("ellapsed-pedestrians");
const pedestrians = document.getElementById("pedestrians");
const vehicles = document.getElementById("vehicles");
const lostTime = document.getElementById("lost-time");

const closingCars = new Date('2019-04-10T17:00:00');
const closingPedestrians = new Date('2020-08-13T17:00:00');
const plannedReopening = new Date('1/1/2027');

const SECONDS_PER_DAY = 3600*24;

const ellapsedTime = (closingDate) => {
    const now = new Date();
    return (now.getTime() - closingDate.getTime()) / 1000
};

const ellapsedTimeTimeUnits = (diffTime) => {
    const years = 0;

    const months = Math.floor(diffTime / (SECONDS_PER_DAY*30));
    diffTime -= months * SECONDS_PER_DAY*30;

    const days = Math.floor(diffTime / SECONDS_PER_DAY);
    diffTime -= days * SECONDS_PER_DAY;

    const hours = Math.floor(diffTime / 3600) % 24;
    diffTime -= hours * 3600;

    const minutes = Math.floor(diffTime / 60) % 60;
    diffTime -= minutes * 60;

    const seconds = Math.floor(diffTime);
    return {
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
};

const formatEllapsedString = (delta) => {
    return `${delta.months} months ${delta.days} days`;
};

const refresh = () => {
    const secondsPedestrians = ellapsedTime(closingPedestrians);
    const deltaPedestrians = ellapsedTimeTimeUnits(secondsPedestrians);
    ellapsedPedestrians.innerHTML = formatEllapsedString(deltaPedestrians);
    pedestrians.innerHTML = Math.floor(16000/SECONDS_PER_DAY*secondsPedestrians).toLocaleString();

    const secondsVehicles = ellapsedTime(closingCars);
    const deltaVehicles = ellapsedTimeTimeUnits(secondsVehicles);
    ellapsedVehicles.innerHTML = formatEllapsedString(deltaVehicles);
    vehicles.innerHTML = Math.floor(22000/SECONDS_PER_DAY*secondsVehicles).toLocaleString();
};

window.onload = function WindowLoad(event) {
    refresh();
}

setInterval(() => {
    refresh();
}, 1000);