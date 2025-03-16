// testEnv.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
console.log('Environment check:');
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('DYNAMODB_THREADS_TABLE:', process.env.DYNAMODB_THREADS_TABLE);
console.log('DYNAMODB_COMMENTS_TABLE:', process.env.DYNAMODB_COMMENTS_TABLE);