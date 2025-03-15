import React, { useState, useEffect } from 'react'
import styles from './ThreadBoard.module.css'

function ThreadBoard() {
  const [threads, setThreads] = useState([])

  useEffect(() => {
    // TODO: Fetch thread data from backend
  }, [])

  return (
    <div className={styles.threadBoard}>
      <h2 className="fw-bold mb-4">Threads</h2>
      {threads.length === 0 ? (
        <p className="text-muted">No threads available.</p>
      ) : (
        threads.map((thread) => (
          <div className="card mb-3 shadow-sm" key={thread.id}>
            <div className="card-body">
              <div className="d-flex mb-3">
                <img
                  src={thread.artworkUrl}
                  alt="cover"
                  className="img-thumbnail me-3"
                  style={{ maxWidth: '100px' }}
                />
                <div>
                  <h5 className="card-title fw-bold">{thread.trackName}</h5>
                  <p className="card-text"><strong>Artist:</strong> {thread.artistName}</p>
                  <p className="card-text"><strong>Album:</strong> {thread.collectionName}</p>
                  <p className="card-text"><strong>Release Date:</strong> {thread.releaseDate}</p>
                  <p className="card-text"><strong>Duration:</strong> {thread.trackTime}</p>
                </div>
              </div>
              <h6>Comments</h6>
              {thread.comments.length === 0 ? (
                <p className="text-muted">No comments yet.</p>
              ) : (
                thread.comments.map((comment, idx) => (
                  <div className="border rounded p-2 mb-2" key={idx}>
                    <strong>{comment.name}</strong>
                    <small className="text-muted ms-2">{comment.timestamp}</small>
                    <p className="mb-0">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ThreadBoard
