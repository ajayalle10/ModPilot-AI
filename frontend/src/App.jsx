import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const analyzeText = async () => {
    if (!text.trim()) {
      alert("Please enter some Reddit content.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", {
        text: text,
      });

      setResult(response.data);
      setHistory([{ text, ...response.data }, ...history]);
      setText("");
    } catch (error) {
      alert("Backend is not running. Start FastAPI first.");
      console.error(error);
    }
  };

  const totalChecked = history.length;
  const flagged = history.filter((item) => item.suggested_action !== "Approve").length;
  const safe = history.filter((item) => item.suggested_action === "Approve").length;

  return (
    <div className="app">
      <h1>ModPilot AI</h1>
      <p className="subtitle">AI-powered Reddit moderation assistant</p>

      <div className="stats">
        <div className="card">
          <h2>{totalChecked}</h2>
          <p>Total Checked</p>
        </div>
        <div className="card">
          <h2>{flagged}</h2>
          <p>Flagged</p>
        </div>
        <div className="card">
          <h2>{safe}</h2>
          <p>Safe</p>
        </div>
      </div>

      <div className="panel">
        <h2>Analyze Reddit Content</h2>
        <textarea
          placeholder="Paste a Reddit post or comment here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={analyzeText}>Analyze Content</button>
      </div>

      {result && (
        <div className="panel result">
          <h2>Moderation Result</h2>
          <p><b>Risk Level:</b> {result.risk}</p>
          <p><b>Suggested Action:</b> {result.suggested_action}</p>
          <p><b>Flags:</b> {result.flags.length ? result.flags.join(", ") : "None"}</p>
        </div>
      )}

      <div className="panel">
        <h2>Moderation History</h2>
        {history.length === 0 ? (
          <p>No content analyzed yet.</p>
        ) : (
          history.map((item, index) => (
            <div className="history-item" key={index}>
              <p>{item.text}</p>
              <small>
                Action: {item.suggested_action} | Risk: {item.risk}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;