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
function setUpButton() {
    const nextButton = document.getElementById("joke-next");
    nextButton.addEventListener('click', updateJoke);
}
window.addEventListener('DOMContentLoaded', () => {
    updateJoke();
    setUpButton();
});
