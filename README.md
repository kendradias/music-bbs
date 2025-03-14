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
# AWS_ACCESS_KEY_ID=your_access_key
# AWS_SECRET_ACCESS_KEY=your_secret_key
```

### 5. Navigate to frontend Directory

`cd /path/to/frontend`

### 6. install dependencies for frontend

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
