// DynamoDB schema definition
const { documentClient } = require('../config/dynamodb');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = process.env.DYNAMODB_THREADS_TABLE || 'music-bbs-threads';

const ThreadModel = {
  // Get all threads
  async getAllThreads() {
    const params = {
      TableName: TABLE_NAME
    };
    
    const result = await documentClient.scan(params).promise();
    return result.Items;
  },
  
  // Get thread by ID
  async getThreadById(threadId) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        threadId
      }
    };
    
    const result = await documentClient.get(params).promise();
    return result.Item;
  },
  
  // Create a new thread
  async createThread({ title, songData, handleName }) {
    const threadId = uuidv4();
    const timestamp = new Date().toISOString();
    
    const params = {
      TableName: TABLE_NAME,
      Item: {
        threadId,
        title,
        songData,
        handleName,
        createdAt: timestamp,
        updatedAt: timestamp,
        commentCount: 0
      }
    };
    
    await documentClient.put(params).promise();
    return params.Item;
  }
};

module.exports = ThreadModel;