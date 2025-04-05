# 📝 TaskMate

**TaskMate** is a simple and efficient to-do list application built with the MERN stack. It helps users organize their tasks, set priorities, and stay productive. 🚀

With a clean and intuitive user interface, TaskMate lets you keep track of your daily goals and manage tasks with ease. ✅

---

## 🌟 Features

- ✅ **User Authentication** (Signup / Signin)
- 🧾 **Create, Read, and Manage Todos**
- 🎯 **Set Task Status** (Pending or Completed)
- 🔒 **JWT-based Authorization**
- 📦 **Zod Validation with Formik**
- 📤 Toast notifications for user feedback

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/50b61751-fa47-4f1e-b72f-68778b3fe522)


---

## 🔧 Tech Stack

**🖥️ Frontend:**
- ⚛️ React  
- 🧭 React Router DOM  
- 📡 Axios  
- 📝 Formik + 🔎 Zod for validation  
- 💨 Tailwind CSS  
- 🔔 React Toastify  

**🛠️ Backend:**
- 🟢 Node.js  
- 🚂 Express.js  
- 🍃 MongoDB (Mongoose)  
- 🛡️ JWT for authentication  
- 🔐 Bcrypt for password hashing  


---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Node.js and npm
- MongoDB (local or cloud)

### 📁 Clone the Repository

```bash
git clone https://github.com/your-username/taskmate.git
cd taskmate
```
### 📦 Install Dependencies
For both ```client``` and ```server```:

```bash
cd client
npm install
cd ../server
npm install
```

### 🔑 Environment Variables
Create a ```.env``` file in the ```server``` directory with the following:

```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 🚴 Run the App
Backend:
```bash
cd server
npm start
```

Frontend:
```bash
cd client
npm run dev
```

---

### 🔐 Authentication
TaskMate uses JWT for authentication. Token is stored in localStorage after login and sent in headers with protected requests.

---

### 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request. Follow best practices and create PRs to the dev branch.

---
### 📄 License
This project is open source and available under the MIT License.

---
### 💬 Contact
Have questions or feedback?
📧 Email: souviksural22@gmail.com
🔗 GitHub: https://github.com/Souvik34

