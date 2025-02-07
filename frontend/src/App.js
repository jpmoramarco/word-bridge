import React, { useState, useEffect } from "react";
import { getNewGame, checkResponse } from "./api";

function App() {
    const [startWord, setStartWord] = useState("");
    const [endWord, setEndWord] = useState("");
    const [currentPath, setCurrentPath] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [gameCompleted, setGameCompleted] = useState(false);

    // Fetch a new game when the component mounts
    useEffect(() => {
        getNewGame().then(data => {
            setStartWord(data.start);
            setEndWord(data.end);
            setCurrentPath([data.start]);
            setGameCompleted(false);
        });
    }, []);

    // Handle user input submission
    function handleSubmit(event) {
        event.preventDefault();
        const nextWord = document.getElementById("nextWord").value.toLowerCase();

        checkResponse([...currentPath, nextWord], startWord, endWord)
            .then(data => {
                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setErrorMessage("");
                    setCurrentPath([...currentPath, nextWord]);

                    // Check if the game is completed
                    if (nextWord === endWord) {
                        setGameCompleted(true);
                    }
                }
            });
    }

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Word Bridge Game</h1>
            <p>Transform the start word into the end word by changing one letter at a time.</p>
            <p><strong>Start:</strong> {startWord} → <strong>End:</strong> {endWord}</p>

            <form onSubmit={handleSubmit}>
                <input type="text" id="nextWord" maxLength="5" required disabled={gameCompleted} />
                <button type="submit" disabled={gameCompleted}>Submit</button>
            </form>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <h2>Current Path:</h2>
            <ul>
                {currentPath.map((word, index) => <li key={index}>{word}</li>)}
            </ul>

            {gameCompleted && <h2 style={{ color: "green" }}>🎉 Congratulations! You completed the path! 🎉</h2>}
        </div>
    );
}

export default App;
