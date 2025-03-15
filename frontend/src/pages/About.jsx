import React from 'react'
import styles from './About.module.css'

function About() {
  return (
    <div className="container">
      <div className={styles.about}>
        <h2 className="fw-bold mb-3">About Music BBS</h2>
        <p>
          This application allows users to share and discuss their favorite music.
          Enjoy an interactive experience with dynamic content.
        </p>
      </div>
    </div>
  )
}

export default About
