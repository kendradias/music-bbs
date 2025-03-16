 // Business logic for threads and comments

const ThreadModel = require('../models/threadModel');
const CommentModel = require('../models/commentModel');

// Thread Controllers
exports.getAllThreads = async (req, res) => {
  try {
    const threads = await ThreadModel.getAllThreads();
    res.json(threads);
  } catch (error) {
    console.error('Error fetching threads:', error);
    res.status(500).json({ error: 'Failed to fetch threads' });
  }
};

exports.getThreadById = async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await ThreadModel.getThreadById(threadId);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    res.json(thread);
  } catch (error) {
    console.error('Error fetching thread:', error);
    res.status(500).json({ error: 'Failed to fetch thread' });
  }
};

exports.createThread = async (req, res) => {
  try {
    const { songName, songQueryUrl, handleName } = req.body;
    
    if (!songName || !songQueryUrl) {
      return res.status(400).json({ error: 'Song name and query URL are required' });
    }
    
    const thread = await ThreadModel.createThread({
      songName,
      songQueryUrl,
      handleName: handleName || 'Anonymous'
    });
    
    res.status(201).json(thread);
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'Failed to create thread' });
  }
};

exports.updateThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const updates = req.body;
    
    // Remove properties that shouldn't be directly updated
    delete updates.threadId;
    delete updates.createdAt;
    delete updates.updatedAt;
    
    const updatedThread = await ThreadModel.updateThread(threadId, updates);
    res.json(updatedThread);
  } catch (error) {
    console.error('Error updating thread:', error);
    res.status(500).json({ error: 'Failed to update thread' });
  }
};

exports.deleteThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    await ThreadModel.deleteThread(threadId);
    res.json({ message: 'Thread deleted successfully' });
  } catch (error) {
    console.error('Error deleting thread:', error);
    res.status(500).json({ error: 'Failed to delete thread' });
  }
};

// Comment Controllers
exports.getComments = async (req, res) => {
  try {
    const { threadId } = req.params;
    const comments = await CommentModel.getCommentsByThreadId(threadId);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { content, handleName } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Comment content is required' });
    }
    
    // Verify thread exists
    const thread = await ThreadModel.getThreadById(threadId);
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    const comment = await CommentModel.createComment({
      threadId,
      content,
      handleName: handleName || 'Anonymous'
    });
    
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { threadId, commentId } = req.params;
    const updates = req.body;
    
    // Remove properties that shouldn't be directly updated
    delete updates.threadId;
    delete updates.commentId;
    delete updates.createdAt;
    delete updates.updatedAt;
    
    const updatedComment = await CommentModel.updateComment(threadId, commentId, updates);
    res.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { threadId, commentId } = req.params;
    await CommentModel.deleteComment(threadId, commentId);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};