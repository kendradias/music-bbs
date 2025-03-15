# music-bbs
Music Bulletin Board System - Cloud Group Project 1

# Step 1\

```
git clone [your-repo-url]
cd music-bbs
```

# Navigate to backend Directory

`cd /path/to/backend`

# install dependencies 

```
npm install
npm install express cors dotenv morgan aws-sdk axios
npm install --save-dev nodemon
```

# Create .env file and add your credentials and configuration. 

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

# Navigate to frontend Directory

`cd /path/to/frontend`

# install dependencies 

`npm install`
