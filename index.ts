interface Joke {
    joke: string,
    id: string,
    status: number
}

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

function setUpButton(): void {
    const nextButton = document.getElementById("joke-next") as HTMLButtonElement;
    nextButton.addEventListener('click', updateJoke);

}

window.addEventListener('DOMContentLoaded', ()=>{
    updateJoke();
    setUpButton()
})