const path = require('path');
const AWS = require('aws-sdk'); 
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { dynamoDB } = require('../config/dynamodb');

// Test connection to DynamoDB
async function testDynamoDBConnection() {
  try {
    if (!process.env.AWS_REGION) {
        console.warn('Warning: AWS_REGION not set in environment, using default us-west-2');
        AWS.config.update({ region: 'us-west-2' });
    }
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