// models/commentModel.js
const { documentClient } = require('../config/dynamodb');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = process.env.DYNAMODB_COMMENTS_TABLE || 'music-bbs-comments';

const CommentModel = {
  // Create a new comment
  async createComment({ threadId, content, handleName }) {
    const commentId = uuidv4();
    const timestamp = new Date().toISOString();
    
    const params = {
      TableName: TABLE_NAME,
      Item: {
        commentId,
        threadId,
        content,
        handleName,
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null
      }
    };
    
    await documentClient.put(params).promise();
    return params.Item;
  },
  
  // Get all comments for a thread
  async getCommentsByThreadId(threadId) {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: "threadId = :threadId",
      FilterExpression: "deletedAt = :null",
      ExpressionAttributeValues: {
        ":threadId": threadId,
        ":null": null
      }
    };
    
    const result = await documentClient.query(params).promise();
    return result.Items;
  },
  
  // Get a specific comment
  async getComment(threadId, commentId) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        threadId,
        commentId
      }
    };
    
    const result = await documentClient.get(params).promise();
    return result.Item;
  },
  
  // Update a comment
  async updateComment(threadId, commentId, updates) {
    // Build update expression
    let updateExpression = "set updatedAt = :updatedAt";
    const expressionAttributeValues = {
      ":updatedAt": new Date().toISOString()
    };
    
    // Add each update to expression
    Object.entries(updates).forEach(([key, value]) => {
      updateExpression += `, ${key} = :${key}`;
      expressionAttributeValues[`:${key}`] = value;
    });
    
    const params = {
      TableName: TABLE_NAME,
      Key: { 
        threadId,
        commentId 
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW"
    };
    
    const result = await documentClient.update(params).promise();
    return result.Attributes;
  },
  
  // Soft delete comment
  async deleteComment(threadId, commentId) {
    return this.updateComment(threadId, commentId, {
      deletedAt: new Date().toISOString()
    });
  }
};

module.exports = CommentModel;