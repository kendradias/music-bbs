const ThreadModel = require("../models/threadModel");
const CommentModel = require("../models/commentModel");

exports.getAllThreads = async (req, res) => {
  console.log("[DEBUG] getAllThreads called");
  try {
    const threads = await ThreadModel.getAllThreads();
    res.json(threads);
  } catch (error) {
    console.error("[ERROR] Error fetching threads:", error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
};

exports.getThreadById = async (req, res) => {
  console.log("[DEBUG] getThreadById called, threadId:", req.params.threadId);
  try {
    const { threadId } = req.params;
    const thread = await ThreadModel.getThreadById(threadId);
    if (!thread) {
      console.error("[ERROR] Thread not found:", threadId);
      return res.status(404).json({ error: "Thread not found" });
    }
    console.log("[DEBUG] getThreadById result:", thread);
    res.json(thread);
  } catch (error) {
    console.error("[ERROR] Error fetching thread:", error);
    res.status(500).json({ error: "Failed to fetch thread" });
  }
};

exports.createThread = async (req, res) => {
  console.log("[DEBUG] createThread called with body:", req.body);
  try {
    const { songName, trackId, trackUrl, artworkUrl, artistName } = req.body;
    if (!songName || !trackId || !artworkUrl) {
      console.error("[ERROR] Missing required fields");
      return res.status(400).json({ error: "songName, trackId, and artworkUrl are required" });
    }
    const thread = await ThreadModel.createThread({
      songName,
      trackId,
      trackUrl,
      artworkUrl,
      artistName: artistName || ""
    });
    console.log("[DEBUG] Successfully created thread:", thread);
    return res.status(201).json(thread);
  } catch (error) {
    console.error("[ERROR] Error creating thread:", error);
    return res.status(500).json({ error: "Failed to create thread" });
  }
};

exports.updateThread = async (req, res) => {
  console.log("[DEBUG] updateThread called, threadId:", req.params.threadId);
  try {
    const { threadId } = req.params;
    const updates = req.body;
    delete updates.threadId;
    delete updates.createdAt;
    delete updates.updatedAt;
    const updatedThread = await ThreadModel.updateThread(threadId, updates);
    console.log("[DEBUG] updateThread result:", updatedThread);
    res.json(updatedThread);
  } catch (error) {
    console.error("[ERROR] Error updating thread:", error);
    res.status(500).json({ error: "Failed to update thread" });
  }
};

exports.deleteThread = async (req, res) => {
  console.log("[DEBUG] deleteThread called, threadId:", req.params.threadId);
  try {
    const { threadId } = req.params;
    await ThreadModel.deleteThread(threadId);
    res.json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.error("[ERROR] Error deleting thread:", error);
    res.status(500).json({ error: "Failed to delete thread" });
  }
};

exports.getComments = async (req, res) => {
  console.log("[DEBUG] getComments called, threadId:", req.params.threadId);
  try {
    const { threadId } = req.params;
    const comments = await CommentModel.getCommentsByThreadId(threadId);
    console.log("[DEBUG] getComments result:", comments);
    res.json(comments);
  } catch (error) {
    console.error("[ERROR] Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

exports.createComment = async (req, res) => {
  console.log("[DEBUG] createComment called, threadId:", req.params.threadId);
  try {
    const { threadId } = req.params;
    const { content, handleName } = req.body;
    if (!content) {
      console.error("[ERROR] Missing comment content");
      return res.status(400).json({ error: "Comment content is required" });
    }
    const thread = await ThreadModel.getThreadById(threadId);
    if (!thread) {
      console.error("[ERROR] Thread not found:", threadId);
      return res.status(404).json({ error: "Thread not found" });
    }
    const comment = await CommentModel.createComment({
      threadId,
      content,
      handleName: handleName || "Anonymous"
    });
    console.log("[DEBUG] Successfully created comment:", comment);
    res.status(201).json(comment);
  } catch (error) {
    console.error("[ERROR] Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

exports.updateComment = async (req, res) => {
  console.log("[DEBUG] updateComment called, threadId:", req.params.threadId, "commentId:", req.params.commentId);
  try {
    const { threadId, commentId } = req.params;
    const updates = req.body;
    delete updates.threadId;
    delete updates.commentId;
    delete updates.createdAt;
    delete updates.updatedAt;
    const updatedComment = await CommentModel.updateComment(threadId, commentId, updates);
    console.log("[DEBUG] updateComment result:", updatedComment);
    res.json(updatedComment);
  } catch (error) {
    console.error("[ERROR] Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

exports.deleteComment = async (req, res) => {
  console.log("[DEBUG] deleteComment called, threadId:", req.params.threadId, "commentId:", req.params.commentId);
  try {
    const { threadId, commentId } = req.params;
    await CommentModel.deleteComment(threadId, commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("[ERROR] Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
