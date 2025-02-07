let startWord = "";
let endWord = "";
let currentPath = [];

function fetchNewGame() {
    fetch('/new_game')
        .then(response => response.json())
        .then(data => {
            startWord = data.start;
            endWord = data.end;
            currentPath = [startWord];
            document.getElementById("startWord").textContent = startWord;
            document.getElementById("endWord").textContent = endWord;
            document.getElementById("pathList").innerHTML = `<li>${startWord}</li>`;
            document.getElementById("gameStatus").textContent = "";
        });
}

document.getElementById("wordBridgeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let nextWord = document.getElementById("nextWord").value.toLowerCase();

    fetch('/check_response', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_path: [...currentPath, nextWord],
            start: startWord,
            end: endWord
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("errorMessage").textContent = data.error;
            } else {
                document.getElementById("errorMessage").textContent = "";
                currentPath.push(nextWord);
                document.getElementById("pathList").innerHTML += `<li>${nextWord}</li>`;

                if (nextWord === endWord) {
                    document.getElementById("gameStatus").textContent = "Congratulations! You completed the path.";
                }
            }
        });
});

fetchNewGame();