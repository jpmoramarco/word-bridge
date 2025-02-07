from flask import Flask, jsonify, render_template, request

from word_bridge.solver import word_bridge

# Flask App
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/solve", methods=["POST"])
def solve():
    data = request.json
    start = data.get("start", "").lower()
    end = data.get("end", "").lower()

    if len(start) != 5 or len(end) != 5:
        return jsonify({"error": "Both words must be exactly 5 letters long."})

    path = word_bridge(start, end)
    if path:
        return jsonify({"path": path})
    else:
        return jsonify({"error": "No valid path found between words."})


if __name__ == "__main__":
    app.run(debug=True)
