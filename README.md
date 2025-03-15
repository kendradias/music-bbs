{toc}

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
PORT=5000
NODE_ENV=development
AWS_REGION=us-west-2
# Add your AWS credentials if needed
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=

# Package JSON Reference: 
{
  "name": "music-bbs-backend",
  "version": "1.0.0",
  "description": "Backend for Music BBS application",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon --watch './**/*.js' server.js"
  },
  "dependencies": {
    "express": "^4.17.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "morgan": "^1.10.0",
    "aws-sdk": "^2.1087.0",
    "axios": "^0.26.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```

### 5. Navigate to frontend Directory

`cd /path/to/frontend`

### 6. install dependencies for frontend

```
npm install
```

## B. How to set up

### execute backend for dev

```
npm run backend
```

### execute frontend for dev

```
npm run frontend
```

### execute end-to-end

```
npm run e2e
```
