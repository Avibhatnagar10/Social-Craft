# Social Media Submission System

## 🚀 Overview
The **Social Media Submission System** is a web-based application that allows users to submit their name, social media handle, and multiple images. An admin dashboard provides an intuitive interface to view all submissions dynamically.

## 🎯 Features
### User Submission Form
- ✅ Input name and social media handle.
- ✅ Upload multiple images simultaneously.
- ✅ Submit data securely to the database.

### Admin Dashboard
- ✅ View all user submissions in a structured format.
- ✅ Display names, social media handles, and uploaded images.
- ✅ Images rendered as thumbnails or clickable links.
- ✅ Dynamic updates when new submissions are made.

## 🏗️ Tech Stack
- **Frontend:** React.js, Bootstrap/Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Storage:** Cloudinary / Firebase Storage (for images)
- **State Management:** Context API / Redux (Optional)

## 📂 Project Structure
```
📦 Social-Media-Submission-System
├── 📁 client (React Frontend)
│   ├── 📁 src
│   │   ├── 📁 components
│   │   ├── 📁 pages
│   │   ├── 📁 assets
│   │   ├── 📄 App.js
│   │   ├── 📄 index.js
│   ├── 📄 package.json
├── 📁 server (Node.js Backend)
│   ├── 📁 models (Mongoose Schemas)
│   ├── 📁 routes (API Endpoints)
│   ├── 📁 controllers
│   ├── 📄 server.js
│   ├── 📄 package.json
└── 📄 README.md
```

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/social-media-submission-system.git
cd social-media-submission-system
```
### 2️⃣ Install Dependencies
#### Client (React)
```sh
cd client
npm install
```
#### Server (Node.js)
```sh
cd server
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the `server` folder and add:
```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_api_url
PORT=5000
```

### 4️⃣ Run the Application
#### Start the Backend
```sh
cd server
npm start
```
#### Start the Frontend
```sh
cd client
npm start
```

## 📌 API Endpoints

### User Submission
- `POST /api/upload` - Submits user data and images.
- `GET /api/submissions` - Fetches all submitted data.


## 🎨 UI Preview

![Screenshot (188)](https://github.com/user-attachments/assets/e5542a51-2d7d-4519-b101-4012d3d64696)

## 🤝 Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Open a Pull Request.

## 📜 License
This project is licensed under the **MIT License**.

---


💡 *Developed by [Avi](https://github.com/Avibhatnagar10)*
