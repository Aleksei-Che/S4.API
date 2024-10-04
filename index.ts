
interface Joke {
    joke: string,
    id: string,
    status: number
}

interface JokeReport {
    joke: string,
    score: number,
    date: string
}

const reportAcudits: JokeReport[] = [];

async function fetchJoke(): Promise<Joke> {

    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data;
    
}

// Acudits de Chak Noris

async function fetchChak(): Promise<any>{
    const response = await fetch('https://api.chucknorris.io/jokes/random', {
        method: "GET",
    });
    const data = await response.json();
    return data;

}

// Elegir acudit

async function fetchAcudit(): Promise<void> {
    const randomChoice = Math.random() < 0.5;
    let acudit;

    if(randomChoice){
        acudit = await fetchJoke();
    } else {
        acudit = await fetchChak();
    }

    const jokeElement = document.getElementById("joke") as HTMLElement;
    jokeElement.innerHTML = acudit.joke ? acudit.joke : acudit.value;
}



function vote(score: number): void {
    const jokeElement = document.getElementById("joke") as HTMLElement;
    const currentJoke = jokeElement.innerHTML;
    const dateISO = new Date().toISOString();

    reportAcudits.push({
        joke: currentJoke,
        score: score,
        date: dateISO
    });

    console.log(reportAcudits);
}

function setupVoting(): void {
    console.log("setupVoting called!")
    const voteButtons = document.querySelectorAll('.btn-vote') as NodeListOf<HTMLButtonElement>;
    console.log(voteButtons);

    if(voteButtons.length === 3) {
        voteButtons[1].addEventListener('click', () => vote(2));
        voteButtons[0].addEventListener('click', () => vote(1));
        voteButtons[2].addEventListener('click', () => vote(3));
        console.log("Voting buttons set up successfully!");
    } else {
        console.error("Error: Voting buttons not founs or incomplete")
    }
}


function setUpButton(): void {
    const nextButton = document.getElementById("joke-next") as HTMLButtonElement;
    nextButton.addEventListener('click', fetchAcudit);

}

// API Weather

async function fetchWeather(): Promise<void> {
    const weatherElement = document.querySelector('.weather') as HTMLElement;

    try{
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona,es&units=metric&APPID=ae90161fe2a3a0c91d8f8da24e3ff8a2', {
            method: "GET"
        });

        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const temperature = data.main.temp;
        const weatherIcon = data.weather[0].icon;

        const iconURL = `https://openweathermap.org/img/wn/${weatherIcon}.png`

        weatherElement.innerHTML = `<img src = "${iconURL}" alt = "Icon weather"> <p> | ${temperature}°С</p>`;


    }catch(error){
        console.log(`Error en obtenir les dades del temps`, error)
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    fetchAcudit()
    setUpButton();
    setupVoting();
    fetchWeather();
})