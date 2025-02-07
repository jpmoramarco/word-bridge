export function getNewGame() {
    return fetch("http://127.0.0.1:5000/new_game")
        .then(response => response.json());
}

export function checkResponse(userPath, startWord, endWord) {
    return fetch("http://127.0.0.1:5000/check_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_path: userPath, start: startWord, end: endWord })
    }).then(response => response.json());
}
