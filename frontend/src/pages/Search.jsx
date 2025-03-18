import React, { useState } from "react";
import styles from "./Search.module.css";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [attribute, setAttribute] = useState("songTerm");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }
    const encodedQuery = encodeURIComponent(query);
    const apiUrl = `/api/music/search?query=${encodedQuery}&attribute=${attribute}`;
    console.log("[DEBUG] Sending GET request to:", apiUrl);

    fetch(apiUrl)
      .then((res) => {
        console.log("[DEBUG] Received response status:", res.status);
        return res.text();
      })
      .then((text) => {
        console.log("[DEBUG] Raw response text:", text.substring(0, 200));
        try {
          const data = JSON.parse(text);
          console.log("[DEBUG] Parsed JSON response:", data);
          if (data.results && data.results.length > 0) {
            setResults(data.results);
          } else {
            setResults([]);
          }
        } catch (err) {
          console.error("[ERROR] JSON parse error:", err);
          alert("Error occurred during search. Check console for details.");
        }
      })
      .catch((error) => {
        console.error("[ERROR] Fetch error:", error);
        alert("Error occurred during search.");
      });
  };

  return (
    <div className={styles.search}>
      <div className="bg-light p-5 text-center mb-5 shadow-sm">
        <h1 className="fw-bold mb-3">BBS Music</h1>
        <p className="text-muted mb-0">
          Search for songs, artists, or albums...
        </p>
      </div>
      <div className="container">
        <form onSubmit={handleSearch} className="mb-3">
          <div className="input-group mb-3">
            <select
              className="form-select"
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
            >
              <option value="songTerm">Song</option>
              <option value="albumTerm">Album</option>
              <option value="artistTerm">Artist</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Enter song, album, or artist"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
        {results.length > 0 && (
          <div className="mt-4">
            <h5 className="mb-3">Search Results</h5>
            <div className="row">
              {results.map((track, idx) => (
                <div className="col-md-6 col-lg-4 mb-3" key={idx}>
                  <div className={`card shadow-sm h-100 ${styles.card}`}>
                    <div className="card-body d-flex">
                      <img
                        src={
                          track.artworkUrl100
                            ? track.artworkUrl100.replace("100x100bb", "300x300bb")
                            : ""
                        }
                        alt=""
                        className="me-3 img-thumbnail"
                        style={{ maxWidth: "80px" }}
                      />
                      <div>
                        <h6 className="mb-1 fw-bold">
                          {track.trackName || track.collectionName || track.artistName}
                        </h6>
                        <p className="mb-1 text-muted">{track.artistName || ""}</p>
                        <button className="btn btn-sm btn-outline-secondary">
                          Discuss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
