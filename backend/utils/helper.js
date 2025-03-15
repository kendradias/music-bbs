// Helper and utility functions

require('dotenv').config();
const { dynamoDB } = require('../config/dynamodb');

// Test connection to DynamoDB
async function testDynamoDBConnection() {
  try {
    console.log('Testing connection to DynamoDB...');
    const result = await dynamoDB.listTables({}).promise();
    console.log('Connection successful!');
    console.log('Available tables:', result.TableNames);
    return true;
  } catch (error) {
    console.error('Connection failed:', error);
    return false;
  }
}

module.exports = {
  testDynamoDBConnection
};