import React, { useState, useEffect } from "react";
import styles from "./ThreadBoard.module.css";

function ThreadBoard() {
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [commentContents, setCommentContents] = useState({});
  const [commentNames, setCommentNames] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 5;

  useEffect(() => {
    fetchThreads();
  }, []);

  useEffect(() => {
    filterThreads();
  }, [threads, searchQuery]);

  const fetchThreads = async () => {
    try {
      const res = await fetch("/api/threads");
      const data = await res.json();
      const threadsWithLatestUpdate = await Promise.all(
        data.map(async (thread) => {
          let latestDate = new Date(thread.updatedAt);
          try {
            const resComments = await fetch(`/api/threads/${thread.threadId}/comments`);
            const comments = await resComments.json();
            if (comments && comments.length > 0) {
              const latestCommentDate = comments.reduce((max, comment) => {
                const commentDate = new Date(comment.updatedAt);
                return commentDate > max ? commentDate : max;
              }, new Date(0));
              if (latestCommentDate > latestDate) {
                latestDate = latestCommentDate;
              }
            }
          } catch (e) {
            console.error(`Error fetching comments for thread ${thread.threadId}:`, e);
          }
          return { ...thread, latestUpdate: latestDate };
        })
      );
      const sortedThreads = threadsWithLatestUpdate.sort((a, b) => b.latestUpdate - a.latestUpdate);
      setThreads(sortedThreads);
    } catch (error) {
      console.error("[ERROR] Failed to fetch threads", error);
    }
  };

  const filterThreads = () => {
    let filtered = threads;
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = threads.filter(
        (thread) =>
          thread.songName.toLowerCase().includes(lowerQuery) ||
          thread.artistName.toLowerCase().includes(lowerQuery)
      );
    }
    setFilteredThreads(filtered);
    setCurrentPage(1);
  };

  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = filteredThreads.slice(indexOfFirstThread, indexOfLastThread);
  const totalPages = Math.ceil(filteredThreads.length / threadsPerPage);

  const handleCommentChange = (threadId, value) => {
    setCommentContents((prev) => ({ ...prev, [threadId]: value }));
  };

  const handleNameChange = (threadId, value) => {
    setCommentNames((prev) => ({ ...prev, [threadId]: value }));
  };

  const handleAddComment = (threadId) => {
    const content = commentContents[threadId] || "";
    const name = commentNames[threadId] || "Anonymous";
    if (!content.trim()) {
      alert("Please enter a comment.");
      return;
    }
    const body = { content, handleName: name };
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
          setCommentContents((prev) => ({ ...prev, [threadId]: "" }));
        }
      })
      .catch(() => {
        alert("Failed to create comment.");
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.threadBoard}>
      <h2 className="fw-bold mb-4">Threads</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search threads by song or artist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {currentThreads.length === 0 ? (
        <p className="text-muted">No threads available.</p>
      ) : (
        currentThreads.map((thread) => {
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
                      <strong>Artist:</strong> {thread.artistName}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Updated at: {thread.latestUpdate.toISOString()}
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
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary btn-sm ms-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
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
