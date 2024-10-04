"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const reportAcudits = [];
function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = yield response.json();
        return data;
    });
}
// Acudits de Chak Noris
function fetchChak() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://api.chucknorris.io/jokes/random', {
            method: "GET",
        });
        const data = yield response.json();
        return data;
    });
}
// Elegir acudit
function fetchAcudit() {
    return __awaiter(this, void 0, void 0, function* () {
        const randomChoice = Math.random() < 0.5;
        let acudit;
        if (randomChoice) {
            acudit = yield fetchJoke();
        }
        else {
            acudit = yield fetchChak();
        }
        const jokeElement = document.getElementById("joke");
        jokeElement.innerHTML = acudit.joke ? acudit.joke : acudit.value;
    });
}
function vote(score) {
    const jokeElement = document.getElementById("joke");
    const currentJoke = jokeElement.innerHTML;
    const dateISO = new Date().toISOString();
    reportAcudits.push({
        joke: currentJoke,
        score: score,
        date: dateISO
    });
    console.log(reportAcudits);
}
function setupVoting() {
    console.log("setupVoting called!");
    const voteButtons = document.querySelectorAll('.btn-vote');
    console.log(voteButtons);
    if (voteButtons.length === 3) {
        voteButtons[1].addEventListener('click', () => vote(2));
        voteButtons[0].addEventListener('click', () => vote(1));
        voteButtons[2].addEventListener('click', () => vote(3));
        console.log("Voting buttons set up successfully!");
    }
    else {
        console.error("Error: Voting buttons not founs or incomplete");
    }
}
function setUpButton() {
    const nextButton = document.getElementById("joke-next");
    nextButton.addEventListener('click', fetchAcudit);
}
// API Weather
function fetchWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherElement = document.querySelector('.weather');
        try {
            const response = yield fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona,es&units=metric&APPID=ae90161fe2a3a0c91d8f8da24e3ff8a2', {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            const temperature = data.main.temp;
            const weatherIcon = data.weather[0].icon;
            const iconURL = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
            weatherElement.innerHTML = `<img src = "${iconURL}" alt = "Icon weather"> <p> | ${temperature}°С</p>`;
        }
        catch (error) {
            console.log(`Error en obtenir les dades del temps`, error);
        }
    });
}
window.addEventListener('DOMContentLoaded', () => {
    fetchAcudit();
    setUpButton();
    setupVoting();
    fetchWeather();
});
