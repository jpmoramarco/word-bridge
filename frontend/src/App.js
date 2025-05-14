import React, { useState, useEffect } from "react";
import { getNewGame, checkResponse } from "./api";

function App() {
    const [startWord, setStartWord] = useState("");
    const [endWord, setEndWord] = useState("");
    const [currentPath, setCurrentPath] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [gameCompleted, setGameCompleted] = useState(false);
    const [nextWord, setNextWord] = useState("");

    // Fetch a new game when the component mounts
    useEffect(() => {
        fetchNewGame();
    }, []);

    function fetchNewGame() {
        getNewGame().then(data => {
            setStartWord(data.start);
            setEndWord(data.end);
            setCurrentPath([data.start]);
            setGameCompleted(false);
            setErrorMessage("");
            setNextWord("");
        });
    }
    // Handle user input submission
    function handleSubmit(event) {
        event.preventDefault();
        const word = nextWord.toLowerCase();

        checkResponse([...currentPath, word], startWord, endWord)
            .then(data => {
                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setErrorMessage("");
                    setCurrentPath([...currentPath, word]);

                    // Check if the game is completed
                    if (word === endWord) {
                        setGameCompleted(true);
                    }

                    setNextWord("");
                }
            });
    }

    function resetGame() {
        setCurrentPath([startWord]); 
        setGameCompleted(false);
        setErrorMessage("");
        setNextWord("");
    }

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Word Bridge Game</h1>
            <p>Transform the start word into the end word by changing one letter at a time.</p>
            <p><strong>Start:</strong> {startWord} → <strong>End:</strong> {endWord}</p>

            <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                <input
                    type="text"
                    id="nextWord"
                    value={nextWord}
                    onChange={(e) => setNextWord(e.target.value)}
                    maxLength="5"
                    required
                    disabled={gameCompleted}
                    style={{ padding: "6px" }}
                />
                <button type="submit" disabled={gameCompleted} style={{ padding: "6px 12px" }}>
                    Submit
                </button>
                <button onClick={resetGame} type="button" style={{ padding: "6px 12px" }}>
                    Reset
                </button>
            </form>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <h2>Current Path</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
                {currentPath.map((word, index) => (
                    <React.Fragment key={index}>
                        <span
                            style={{
                                padding: "8px 12px",
                                backgroundColor: "#e0f7fa",
                                borderRadius: "10px",
                                fontFamily: "monospace",
                                fontWeight: "bold",
                                border: "1px solid #00acc1",
                            }}
                        >
                            {word}
                        </span>
                        {index < currentPath.length - 1 && <span style={{ fontSize: "20px", color: "#888" }}>→</span>}
                    </React.Fragment>
                ))}
            </div>

            {gameCompleted && (
                <h2 style={{ color: "green" }}>
                    🎉 Congratulations! You completed the path in{" "}
                    <span style={{ color: "#1976d2", fontWeight: "bold" }}>
                        {currentPath.length - 1}
                    </span>{" "}
                    step{currentPath.length - 1 !== 1 ? "s" : ""}! 🎉
                </h2>
            )}
            {gameCompleted && (
                <div style={{ marginTop: "20px" }}>
                    <button onClick={fetchNewGame} style={{ padding: "8px 16px" }}>
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
