"use strict";
// import 'bootstrap/dist/css/bootstrap.min.css';
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
function updateJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jokeData = yield fetchJoke();
            const jokeElement = document.getElementById("joke");
            jokeElement.innerHTML = jokeData.joke;
            console.log(jokeData.joke);
        }
        catch (error) {
            console.log("#Error", error);
        }
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
    nextButton.addEventListener('click', updateJoke);
}
window.addEventListener('DOMContentLoaded', () => {
    updateJoke();
    setUpButton();
    setupVoting();
});
