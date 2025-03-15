// testAws.js
require('dotenv').config();
const AWS = require('aws-sdk');

console.log('Environment variables:');
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'Set (hidden)' : 'Not set');
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? 'Set (hidden)' : 'Not set');

// Explicitly configure AWS
AWS.config.update({
  region: 'us-east-1', // Hardcoding region for test
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoDB = new AWS.DynamoDB();

async function testConnection() {
  try {
    console.log('Testing connection to DynamoDB...');
    const result = await dynamoDB.listTables({}).promise();
    console.log('Connection successful!');
    console.log('Available tables:', result.TableNames);
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();