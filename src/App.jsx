import { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("long_url", longUrl);

    const res = await fetch("http://localhost:8000/shorten", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setShortUrl(data.short_url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to shorten link app</h1>

      <form onSubmit={handleSubmit}>
        <label>Enter your link URL:</label>
        <br /><br />

        <input
          type="text"
          placeholder="Paste your long URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          style={{ width: "300px" }}
        />

        <br /><br />

        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <>
          <h2>Your shortened URL:</h2>

          <input
            type="text"
            value={shortUrl}
            readOnly
            style={{ width: "300px" }}
          />

          <br /><br />

          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </>
      )}
    </div>
  );
}

export default App;