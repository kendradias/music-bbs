import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [attribute, setAttribute] = useState("songTerm");
  const navigate = useNavigate();

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
        return res.json();
      })
      .then((data) => {
        console.log("[DEBUG] Parsed JSON response:", data);
        if (data.results && data.results.length > 0) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      })
      .catch((error) => {
        console.error("[ERROR] Fetch error:", error);
        alert("Error occurred during search.");
      });
  };

  const handleDiscuss = (track) => {
    const songName = track.trackName || track.collectionName || track.artistName;
    const trackId = track.trackId;
    const trackUrl =
      track.trackViewUrl || (trackId ? `https://itunes.apple.com/lookup?id=${trackId}` : "");
    const artworkUrl = track.artworkUrl100
      ? track.artworkUrl100.replace("100x100bb", "300x300bb")
      : "";

    console.log("[DEBUG] handleDiscuss called with:", {
      songName,
      trackId,
      trackUrl,
      artworkUrl
    });

    fetch("/api/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        songName: songName,
        trackId: trackId,
        trackUrl: trackUrl,
        artworkUrl: artworkUrl,
        handleName: "Anonymous"
      })
    })
      .then((res) => {
        console.log("[DEBUG] POST /api/threads status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("[DEBUG] Created thread:", data);
        if (data.error) {
          alert("Failed to create thread: " + data.error);
        } else {
          navigate("/threads");
        }
      })
      .catch(() => {
        alert("Failed to create thread. Check console for details.");
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
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleDiscuss(track)}
                        >
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
