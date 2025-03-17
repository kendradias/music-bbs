import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <div className={styles.logoSection}>
            <div className={styles.appleMusicLogo}>
              {/* Apple Music Logo */}
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path
                  fill="#fc3c44"
                  d="M23.9 6.5c0-.7-.2-1.5-.4-2.3-.3-1-.9-1.9-1.6-2.6-.7-.7-1.6-1.3-2.6-1.6C18.5.1 17.7 0 17 0H7C6.3 0 5.5.2 4.7.4c-1 .3-1.9.9-2.6 1.6C1.4 2.7.8 3.6.5 4.6.1 5.4 0 6.2 0 6.9v10c0 .7.2 1.5.4 2.3.3 1 .9 1.9 1.6 2.6.7.7 1.6 1.3 2.6 1.6.8.3 1.6.4 2.3.4h10c.7 0 1.5-.2 2.3-.4 1-.3 1.9-.9 2.6-1.6.7-.7 1.3-1.6 1.6-2.6.3-.8.4-1.6.4-2.3V6.9h.1z"
                />
                <path
                  fill="white"
                  d="M12.3 3.7c.7 0 1.9.5 2.6 1.2.6.6.9 1.5.9 2.4 0 .2-.1.3-.3.3h-.3c-.2 0-.3-.1-.3-.3 0-.7-.3-1.3-.7-1.8-.5-.5-1.3-.8-2.1-.8-.8 0-1.5.3-2.1.8-.5.5-.8 1.1-.8 1.8 0 .2-.1.3-.3.3h-.3c-.2 0-.3-.1-.3-.3 0-.9.3-1.8.9-2.4.9-.8 2-.1.1-1.2zm-.3 3.5c1.7 0 3.1 1.3 3.1 3 0 .5-.1 1-.3 1.5-.2.5-.6.9-1 1.3-.4.4-.9.6-1.4.8-.5.2-1.1.2-1.6.1-.5-.1-1-.3-1.4-.6-.4-.3-.8-.7-1-1.2-.2-.5-.3-1-.3-1.5 0-.5.1-1 .3-1.5.2-.5.6-.9 1-1.3.4-.4.9-.6 1.4-.8.3-.1.8-.1 1.2.2z"
                />
              </svg>
            </div>
            <h3 className={styles.footerTitle}>BBS Music</h3>
          </div>
          <p className={styles.footerDescription}>
            A modern bulletin board system for music enthusiasts
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/threads">Threads</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>Contact Us</h4>
          <ul className={styles.contactInfo}>
            <li>
              <i className="fas fa-envelope"></i> contact@musicbbs.com
            </li>
            <li>
              <i className="fas fa-phone"></i> (123) 456-7890
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i> Vancouver, BC, Canada
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Music BBS. All rights reserved.
        </p>
        <p className={styles.apiCredit}>
          Powered by{" "}
          <a
            href="https://developer.apple.com/documentation/applemusicapi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Music API
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
