# music-bbs

Music Bulletin Board System - Cloud Group Project 1

## A. How to set up

### 1. clone the repo and install dependencies for root

```
git clone [your-repo-url]
cd music-bbs
npm install
```

### 2. Navigate to backend Directory

`cd /path/to/backend`

### 3. install dependencies for backend

```
npm install
npm install express cors dotenv morgan aws-sdk axios
npm install --save-dev nodemon
```

### 4. Create .env file and add your credentials and configuration.

```
PORT=5173
NODE_ENV=development
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
DYNAMODB_THREADS_TABLE=music-bbs-threads
DYNAMODB_COMMENTS_TABLE=music-bbs-comments
```

### 5. AWS Setup

#### Create IAM User

1. Sign in to AWS Management Console
2. Navigate to IAM (Identity and Access Management)
3. Click "Users" → "Add user"
4. Enter a username (e.g., "music-bbs-dynamodb")
5. Under AWS access type, select "Access key - Programmatic access"
6. Click "Next: Permissions"
7. Select "Attach existing policies directly"
8. Search for and select "AmazonDynamoDBFullAccess"
9. Complete the user creation process
10. Save the Access Key ID and Secret Access Key for your .env file

#### Create DynamoDB Tables

1. Navigate to DynamoDB in AWS Console
2. Click "Create table"
3. Create the Threads table:
   - Table name: `music-bbs-threads`
   - Primary key: `threadId` (String)
4. Create the Comments table:
   - Table name: `music-bbs-comments`
   - Primary key: `threadId` (String)
   - Sort key: `commentId` (String)

### 6. Test AWS Connection and Models NOTE: I have configured both package.json files so you should be able to run these commands from either the root directory or the backend directory

npm run test:db # Tests your AWS connection
npm run test:models # Tests the DynamoDB models and CRUD operations
npm run test:env # Tests environment variable loading

### 7. Navigate to frontend Directory

`cd /path/to/frontend`

### 8. install dependencies for frontend

```
npm install
```

## B. How to run dev env

### execute backend for dev

```
cd /path/to/backend
npm run backend
```

### execute frontend for dev

```
cd /path/to/frontend
npm run frontend
```

### execute end-to-end

```
cd /path/to/projectroot
npm run e2e
```

## D. Test Files

The project includes several test files to verify functionality:

- `backend/utils/helper.js`: Contains the `testDynamoDBConnection()` function that checks connection to AWS DynamoDb
- `backend/testModels.js`: Tests CRUD operations for threads and comments
- `backend/testEnv.js`: Tests environment variable loading

These test files are useful during development but not needed for production deployment.
