import React, { useState } from 'react'
import styles from './Search.module.css'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) {
      alert('Please enter a search query.')
      return
    }
    const encodedQuery = encodeURIComponent(query)
    // Call backend API which will fetch data from iTunes
    const apiUrl = `/api/search?query=${encodedQuery}`
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setResults(data.results)
        } else {
          setResults([])
        }
      })
      .catch((error) => {
        console.error(error)
        alert('Error occurred during search.')
      })
  }

  return (
    <div className={styles.search}>
      <div className="bg-light p-5 text-center mb-5 shadow-sm">
        <h1 className="fw-bold mb-3">Music BBS</h1>
        <p className="text-muted mb-0">Search for songs, artists, or albums...</p>
      </div>
      <div className="container">
        <form onSubmit={handleSearch} className="mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter song, artist, or album"
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
                        src={track.artworkUrl100.replace('100x100bb', '300x300bb')}
                        alt="cover"
                        className="me-3 img-thumbnail"
                        style={{ maxWidth: '80px' }}
                      />
                      <div>
                        <h6 className="mb-1 fw-bold">{track.trackName}</h6>
                        <p className="mb-1 text-muted">{track.artistName}</p>
                        <button className="btn btn-sm btn-outline-secondary">Discuss</button>
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
  )
}

export default Search
