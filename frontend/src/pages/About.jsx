import React from "react";
import styles from "./About.module.css";

function About() {
  const teamMembers = [
    { id: 1, name: "Kendra Dias", role: "Backend Developer" },
    { id: 2, name: "Yoshito Siguyama", role: "Backend Developer" },
    { id: 3, name: "Parmvir ", role: "UI/UX Designer" },
    { id: 4, name: "Anton Kupriianov ", role: "Frontend Developer" },
  ];

  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutHeader}>
        <h1>About BBS Music</h1>
      </div>

      <div className={styles.aboutContent}>
        <div className={styles.aboutDescription}>
          <p>
            BBS Music is a modern take on the classic Bulletin Board System,
          </p>
          <p>
            allowing music enthusiasts to discover and discuss their favorite
            songs.
          </p>
          <p>Search for music through the iTunes API and start conversations</p>
          <p>with fellow music lovers around the world.</p>
        </div>

        <div className={styles.featureSection}>
          <h2>Features</h2>
          <ul className={styles.featureList}>
            <li>
              <span className={styles.featureIcon}>🎵</span>
              <div>
                <h3>Music Discovery</h3>
                <p>Search and discover music from the iTunes catalog</p>
              </div>
            </li>
            <li>
              <span className={styles.featureIcon}>💬</span>
              <div>
                <h3>Discussion Threads</h3>
                <p>Create and join discussions about your favorite songs</p>
              </div>
            </li>
            <li>
              <span className={styles.featureIcon}>👥</span>
              <div>
                <h3>Community</h3>
                <p>Connect with other music enthusiasts worldwide</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.teamSection}>
          <h2>Our Team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.teamMember}>
                <div className={styles.memberAvatar}></div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
