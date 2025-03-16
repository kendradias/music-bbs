import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container text-center py-3">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} Music BBS. All rights reserved.
        </small>
      </div>
    </footer>
  )
}

export default Footer
