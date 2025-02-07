# Copyright (c) 2025 Joseph Moramarco
# Licensed under the MIT License.
# See the LICENSE file in the project root for more details.
import logging

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from word_bridge.solver import (
    find_shortest_path,
    generate_neighbors,
    get_random_word_pair,
)

logging.basicConfig(level=logging.DEBUG)

# Flask App
app = Flask(__name__)
CORS(app)


@app.route("/")
def serve_react():
    return send_from_directory("../frontend/build", "index.html")


@app.route("/static/<path:path>")
def serve_static(path):
    return send_from_directory("../frontend/build/static", path)


@app.route("/solve", methods=["POST"])
def solve():
    data = request.json
    start = data.get("start", "").lower()
    end = data.get("end", "").lower()

    if len(start) != 5 or len(end) != 5:
        return jsonify({"error": "Both words must be exactly 5 letters long."})

    path = find_shortest_path(start, end)
    if path:
        return jsonify({"path": path})
    else:
        return jsonify({"error": "No valid path found between words."})


@app.route("/check_response", methods=["POST"])
def check_response():
    data = request.json
    user_path = data.get("user_path", [])
    start = data.get("start", "").lower()
    end = data.get("end", "").lower()
    optimal_path = find_shortest_path(start, end)

    if not optimal_path:
        return jsonify({"error": "Invalid start or end word."})

    if user_path[-1] == end:
        return jsonify({"user_path": user_path, "optimal_path": optimal_path})

    last_word = user_path[-1]
    if last_word not in generate_neighbors(user_path[-2]):
        return jsonify({"error": "Invalid word entered."})

    return jsonify({"message": "Valid move, continue playing."})


@app.route("/new_game", methods=["GET"])
def new_game():
    start, end, optimal_path = get_random_word_pair()
    logging.debug(f"Optimal Path is: {optimal_path}")
    return jsonify({"start": start, "end": end, "optimal_path": optimal_path})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
