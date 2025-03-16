import React, { useState, useEffect } from 'react'
import styles from './Home.module.css'

function Home() {
  const [discussions, setDiscussions] = useState([])

  useEffect(() => {
    // TODO: Fetch discussions from backend API
  }, [])

  return (
    <div className="container">
      <div className={`text-center p-5 mb-5 shadow-sm ${styles.hero}`}>
        <h1 className="fw-bold mb-3">Welcome to Music BBS</h1>
        <p className="text-muted mb-0">
          Discover and discuss your favorite music with others
        </p>
      </div>
      <h4 className="mb-3">Recent Discussions</h4>
      {discussions.length === 0 ? (
        <p className="text-muted">No discussions yet.</p>
      ) : (
        <div className="row">
          {discussions.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className={`card shadow-sm h-100 ${styles.card}`}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text text-muted">{item.comments} comments</p>
                  <p className="card-text">
                    <small className="text-muted">Started by {item.author}</small>
                  </p>
                  <div className="mt-auto">
                    <button className="btn btn-primary btn-sm">View Thread</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
