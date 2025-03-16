// backend/config/dynamodb.js
const AWS = require('aws-sdk');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Log configuration for debugging
console.log('DynamoDB Config - Region:', process.env.AWS_REGION);

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION || 'us-west-2', // Fallback to us-west-2 if not set
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create DynamoDB client
const dynamoDB = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = { dynamoDB, documentClient };