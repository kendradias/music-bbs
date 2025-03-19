const { documentClient } = require("../config/dynamodb");
const { v4: uuidv4 } = require("uuid");

const TABLE_NAME = process.env.DYNAMODB_THREADS_TABLE || "music-bbs-threads";

const ThreadModel = {
  async createThread({ songName, trackId, trackUrl, artworkUrl, artistName }) {
    const threadId = uuidv4();
    const timestamp = new Date().toISOString();
    const params = {
      TableName: TABLE_NAME,
      Item: {
        threadId,
        trackId,
        trackUrl,
        artworkUrl,
        songName,
        artistName,
        createdAt: timestamp,
        updatedAt: timestamp,
        deletedAt: null
      }
    };
    await documentClient.put(params).promise();
    return params.Item;
  },

  async getAllThreads() {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "deletedAt = :null",
      ExpressionAttributeValues: {
        ":null": null
      }
    };
    const result = await documentClient.scan(params).promise();
    return result.Items;
  },

  async getThreadById(threadId) {
    const params = {
      TableName: TABLE_NAME,
      Key: { threadId }
    };
    const result = await documentClient.get(params).promise();
    return result.Item;
  },

  async updateThread(threadId, updates) {
    let updateExpression = "set updatedAt = :updatedAt";
    const expressionAttributeValues = {
      ":updatedAt": new Date().toISOString()
    };
    Object.entries(updates).forEach(([key, value]) => {
      updateExpression += `, ${key} = :${key}`;
      expressionAttributeValues[`:${key}`] = value;
    });
    const params = {
      TableName: TABLE_NAME,
      Key: { threadId },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW"
    };
    const result = await documentClient.update(params).promise();
    return result.Attributes;
  },

  async deleteThread(threadId) {
    return this.updateThread(threadId, {
      deletedAt: new Date().toISOString()
    });
  }
};

module.exports = ThreadModel;
