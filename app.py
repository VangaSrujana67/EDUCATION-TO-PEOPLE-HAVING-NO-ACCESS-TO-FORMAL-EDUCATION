from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

API_KEY = " Replace with your actual Gemini API key"  # 🔁 Replace with your actual Gemini API key

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"


@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        prompt = data.get("prompt", "").strip()

        if not prompt:
            return jsonify({"reply": "Please enter a question."}), 400

        response = requests.post(
            f"{GEMINI_API_URL}?key={API_KEY}",
            json={
                "contents": [
                    {
                        "parts": [{"text": prompt}]
                    }
                ]
            },
            headers={"Content-Type": "application/json"}
        )

        if response.status_code != 200:
            return jsonify({"reply": f"Gemini API error {response.status_code}: {response.text}"}), 500

        res_data = response.json()
        reply_text = res_data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

        return jsonify({"reply": reply_text})

    except Exception as e:
        print("Server error:", e)
        return jsonify({"reply": "Sorry, something went wrong."}), 500

if __name__ == "__main__":
    app.run(debug=True)
