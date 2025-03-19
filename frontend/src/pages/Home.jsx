import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [discussions, setDiscussions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDiscussions() {
      try {
        const res = await fetch("/api/threads");
        const threads = await res.json();
        if (!threads || threads.length === 0) {
          setDiscussions([]);
          return;
        }
        const threadsWithData = await Promise.all(
          threads.map(async (thread) => {
            const commentsRes = await fetch(`/api/threads/${thread.threadId}/comments`);
            const comments = await commentsRes.json();
            let latestDate = new Date(thread.createdAt);
            const sortedComments = comments
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .slice(0, 3);
            if (sortedComments.length > 0) {
              const topDate = new Date(sortedComments[0].updatedAt);
              if (topDate > latestDate) {
                latestDate = topDate;
              }
            }
            return { ...thread, latestDate, recentComments: sortedComments };
          })
        );
        threadsWithData.sort((a, b) => b.latestDate - a.latestDate);
        setDiscussions(threadsWithData.slice(0, 3));
      } catch (error) {
        console.error("[ERROR] Failed to fetch discussions:", error);
      }
    }
    fetchDiscussions();
  }, []);

  return (
    <div className={styles.homePage}>
      <div className={styles.heroSection}>
        <h1>Welcome to BBS Music</h1>
        <p>Find and discuss your favorite music with fellow enthusiasts</p>
      </div>
      <div className={styles.contentSection}>
        <h2>Recent Discussions</h2>
        {discussions.length === 0 ? (
          <p className="text-muted">No threads available.</p>
        ) : (
          <div className={styles.discussionsGrid}>
            {discussions.map((thread) => (
              <div className={styles.discussionCard} key={thread.threadId}>
                {thread.artworkUrl && (
                  <img
                    src={thread.artworkUrl}
                    alt="Jacket"
                    style={{ maxWidth: "80px", marginBottom: "10px" }}
                  />
                )}
                <h3>{thread.songName}</h3>
                {thread.artistName && (
                  <p className={styles.artistName}>{thread.artistName}</p>
                )}
                {thread.recentComments && thread.recentComments.length > 0 ? (
                  <div>
                    {thread.recentComments.map((comment) => (
                      <div key={comment.commentId} className={styles.discussionMeta}>
                        <p>{comment.content}</p>
                        <p>
                          <small>
                            by {comment.handleName} at {new Date(comment.updatedAt).toLocaleString()}
                          </small>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No comments yet.</p>
                )}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: "20px" }}>
          <button className={styles.viewButton} onClick={() => navigate("/threads")}>
            View Discussions
          </button>
        </div>
        <div className={styles.exploreMore}>
          <h3>Discover More Music</h3>
          <p>Search for your favorite artists and songs to join or start discussions</p>
          <button className={styles.exploreButton} onClick={() => navigate("/search")}>
            Explore Music
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
