// import 'bootstrap/dist/css/bootstrap.min.css';

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

async function updateJoke(): Promise<void> {

    try {
        const jokeData = await fetchJoke();
        const jokeElement = document.getElementById("joke") as HTMLElement;
        jokeElement.innerHTML = jokeData.joke;
        console.log(jokeData.joke)
    } catch (error){
        console.log("#Error", error)
    }
    
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
    nextButton.addEventListener('click', updateJoke);

}

window.addEventListener('DOMContentLoaded', ()=>{
    updateJoke();
    setUpButton();
    setupVoting();
})