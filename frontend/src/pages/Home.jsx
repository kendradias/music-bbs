import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";

function Home() {
  // Sample discussion data
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      comments: 23,
      author: "user123",
      timeAgo: "2h ago",
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      comments: 15,
      author: "music_fan",
      timeAgo: "5h ago",
    },
    {
      id: 3,
      title: "Imagine",
      artist: "John Lennon",
      comments: 31,
      author: "beatles_lover",
      timeAgo: "1d ago",
    },
  ]);

  useEffect(() => {
    // In a real app, you would fetch discussions from backend API
    // For now, we're using the static data initialized above
  }, []);

  return (
    <div className={styles.homePage}>
      <div className={styles.heroSection}>
        <h1>Welcome to BBS Music </h1>
        <p>Find and discuss your favorite music with fellow enthusiasts</p>
      </div>

      <div className={styles.contentSection}>
        <h2>Recent Discussions</h2>

        <div className={styles.discussionsGrid}>
          {discussions.map((discussion) => (
            <div className={styles.discussionCard} key={discussion.id}>
              <h3>{discussion.title}</h3>
              <p className={styles.artistName}>{discussion.artist}</p>
              <div className={styles.discussionMeta}>
                <p>{discussion.comments} comments</p>
                <p>
                  Started by {discussion.author} • {discussion.timeAgo}
                </p>
              </div>
              <button className={styles.viewButton}>View Discussion</button>
            </div>
          ))}
        </div>

        <div className={styles.exploreMore}>
          <h3>Discover More Music</h3>
          <p>
            Search for your favorite artists and songs to join or start
            discussions
          </p>
          <button className={styles.exploreButton}>Explore Music</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
