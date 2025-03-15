// backend/utils/helper.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { dynamoDB } = require('../config/dynamodb');

// Test connection to DynamoDB
async function testDynamoDBConnection() {
  try {
    console.log('Environment check:');
    console.log('AWS_REGION:', process.env.AWS_REGION || 'Not set');
    console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'Set (hidden)' : 'Not set');
    
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