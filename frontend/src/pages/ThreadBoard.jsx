import React, { useState, useEffect } from "react";
import styles from "./ThreadBoard.module.css";

function ThreadBoard() {
  const [threads, setThreads] = useState([]);
  const [commentContents, setCommentContents] = useState({});
  const [commentNames, setCommentNames] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = () => {
    fetch("/api/threads")
      .then((res) => res.json())
      .then((data) => {
        setThreads(data);
      })
      .catch(() => {
        console.error("[ERROR] Failed to fetch threads");
      });
  };

  const handleCommentChange = (threadId, value) => {
    setCommentContents((prev) => ({
      ...prev,
      [threadId]: value
    }));
  };

  const handleNameChange = (threadId, value) => {
    setCommentNames((prev) => ({
      ...prev,
      [threadId]: value
    }));
  };

  const handleAddComment = (threadId) => {
    const content = commentContents[threadId] || "";
    const name = commentNames[threadId] || "Anonymous";

    if (!content.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const body = {
      content: content,
      handleName: name
    };

    fetch(`/api/threads/${threadId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Failed to create comment: " + data.error);
        } else {
          setRefreshKey((prev) => prev + 1);
          setCommentContents((prev) => ({
            ...prev,
            [threadId]: ""
          }));
        }
      })
      .catch(() => {
        alert("Failed to create comment.");
      });
  };

  return (
    <div className={styles.threadBoard}>
      <h2 className="fw-bold mb-4">Threads</h2>
      {threads.length === 0 ? (
        <p className="text-muted">No threads available.</p>
      ) : (
        threads.map((thread) => {
          const threadId = thread.threadId;
          return (
            <div className="card mb-3 shadow-sm" key={threadId}>
              <div className="card-body">
                <div className="d-flex mb-3">
                  <img
                    src={thread.artworkUrl || ""}
                    alt="cover"
                    className="img-thumbnail me-3"
                    style={{ maxWidth: "100px" }}
                  />
                  <div>
                    <h5 className="card-title fw-bold">{thread.songName}</h5>
                    <p className="card-text">
                      <strong>trackId:</strong> {thread.trackId}
                    </p>
                    <p className="card-text">
                      <strong>Handle Name:</strong> {thread.handleName}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Created at: {thread.createdAt}
                      </small>
                    </p>
                  </div>
                </div>
                <h6>Comments</h6>
                <ThreadComments threadId={threadId} refreshKey={refreshKey} />
                <div className="mt-2">
                  <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    placeholder="Your name (optional)"
                    value={commentNames[threadId] || ""}
                    onChange={(e) => handleNameChange(threadId, e.target.value)}
                  />
                  <textarea
                    className="form-control form-control-sm mb-2"
                    placeholder="Enter your comment"
                    value={commentContents[threadId] || ""}
                    onChange={(e) => handleCommentChange(threadId, e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAddComment(threadId)}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function ThreadComments({ threadId, refreshKey }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/threads/${threadId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch(() => {
        console.error("[ERROR] Failed to fetch comments");
      });
  }, [threadId, refreshKey]);

  if (comments.length === 0) {
    return <p className="text-muted">No comments yet.</p>;
  }

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.commentId} className="border rounded p-2 mb-2">
          <strong>{comment.handleName}</strong>
          <small className="text-muted ms-2">{comment.createdAt}</small>
          <p className="mb-0">{comment.content}</p>
        </div>
      ))}
    </>
  );
}

export default ThreadBoard;
