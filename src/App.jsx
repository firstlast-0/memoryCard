import { useState, useEffect } from 'react';
import './App.css';

function App() {
    let pokemon = ['pikachu', 'charizard', 'bulbasaur', 'mewtwo', 'eevee', 'snorlax', 'garchomp', 'blastoise', 'gengar', 'lapras'];    
    const [data, setData] = useState([]);
    const [clicked, setClicked] = useState([]);
    const [score, setScore] = useState(0);
    const [hScore, sethScore] = useState(0);

    function shuffle(array) {
        let shuffled = array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        return shuffled;
    }

    function clickHandler(name) {
        
        if (clicked.includes(name)) {
            setClicked([]);
            if (score > hScore) {
                sethScore(score)
            }
            setScore(0);
        } else {
            console.log(name);
            let newClicked = clicked.slice();
            newClicked.push(name);
            setClicked(newClicked);

            let newScore = score;
            newScore++;
            setScore(newScore);
        }

        let newData = data.slice();
        newData = shuffle(newData);
        setData(newData);

    }

    async function getPok() {
        let newData = [];
        for (let pok of pokemon) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pok}`, { mode: 'cors' });
            const pokeData = await response.json();

            newData.push({name: pokeData.name, url: pokeData.sprites.front_default, clicked: false})            
        }    
        setData(newData);    
    }

    useEffect(() => {
        getPok();                       
    }, []);

    if (data.length === 0) {
       return <p>Loading images...</p>;
    }

    return (
        <>
            <h2>POKEMON MEMORY GAME</h2>
            <h3>Get points by clicking on an image but don&apos;t click on any more than once!</h3>
            <div>High Score: {hScore}</div>
            <div>Score: {score}</div>
            
            {data.map((pok, index) => { 
                return (<img src={pok.url} alt={pok.name} onClick={(event) => clickHandler(event.target.alt)} key={index}/>)
            })}            
        </>
    )
}

export default App;
