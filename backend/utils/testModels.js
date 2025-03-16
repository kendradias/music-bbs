// testModels.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

//debugging section
console.log('Environment check in testModels:');
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'Set (hidden)' : 'Not set');

const ThreadModel = require('../models/threadModel');
const CommentModel = require('../models/commentModel');

// Test function to run all tests
async function runTests() {
  try {
    console.log('Starting tests...');
    
    // Test 1: Create a thread
    console.log('\n--- Test 1: Create Thread ---');
    const thread = await ThreadModel.createThread({
      songName: 'Bohemian Rhapsody',
      songQueryUrl: 'https://itunes.apple.com/lookup?id=1440806723',
      handleName: 'TestUser'
    });
    console.log('Thread created:', thread);
    
    // Save threadId for future tests
    const threadId = thread.threadId;
    
    // Test 2: Get thread by ID
    console.log('\n--- Test 2: Get Thread by ID ---');
    const fetchedThread = await ThreadModel.getThreadById(threadId);
    console.log('Fetched thread:', fetchedThread);
    
    // Test 3: Create a comment
    console.log('\n--- Test 3: Create Comment ---');
    const comment = await CommentModel.createComment({
      threadId,
      content: 'This is a test comment!',
      handleName: 'CommentUser'
    });
    console.log('Comment created:', comment);
    
    // Save commentId for future tests
    const commentId = comment.commentId;
    
    // Test 4: Get comments for thread
    console.log('\n--- Test 4: Get Comments for Thread ---');
    const comments = await CommentModel.getCommentsByThreadId(threadId);
    console.log('Thread comments:', comments);
    
    // Test 5: Update a thread
    console.log('\n--- Test 5: Update Thread ---');
    const updatedThread = await ThreadModel.updateThread(threadId, {
      songName: 'Updated Song Name'
    });
    console.log('Updated thread:', updatedThread);
    
    // Test 6: Update a comment
    console.log('\n--- Test 6: Update Comment ---');
    const updatedComment = await CommentModel.updateComment(threadId, commentId, {
      content: 'This comment has been updated!'
    });
    console.log('Updated comment:', updatedComment);
    
    // Test 7: Delete a comment (soft delete)
    console.log('\n--- Test 7: Delete Comment ---');
    await CommentModel.deleteComment(threadId, commentId);
    const deletedComment = await CommentModel.getComment(threadId, commentId);
    console.log('Deleted comment (should have deletedAt timestamp):', deletedComment);
    
    // Test 8: Delete a thread (soft delete)
    console.log('\n--- Test 8: Delete Thread ---');
    await ThreadModel.deleteThread(threadId);
    const deletedThread = await ThreadModel.getThreadById(threadId);
    console.log('Deleted thread (should have deletedAt timestamp):', deletedThread);
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the tests
runTests();