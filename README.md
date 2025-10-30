# 🕒 ShiftMS – Smart Shift Management System

**ShiftMS** is a modern web application designed to simplify employee shift scheduling and management.  
It enables (admins/users) to create groups, assign employees, and monitor current and upcoming shifts in real-time.  
Built with a **Next.js** frontend and an **Express.js + TypeScript** backend, ShiftMS is fast, secure, and scalable.


## 📝 Note
This project is part of my ongoing learning journey in full-stack development.  
If you have any suggestions or feedback to help me improve, please feel free to reach out or open an issue —  
I’d really appreciate your insights 🙏


---

## 🚀 Features

- 🔐 **Authentication System** – Secure admin signup/login with JWT + Refresh Tokens  
- 👥 **Employee & Group Management** – Create, update, and manage employees and work groups  
- ⏰ **Shift Tracking** – Display current and next shifts dynamically based on working days  
- 🧾 **Validation** – All input fields are validated using express-validator  
- 🧠 **Smart Filtering** – Filter shifts based on day and time  
- 🪶 **Modern UI** – Built with TailwindCSS for a clean, responsive design  

---

## 🧩 Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS

**Backend**
- Node.js + Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- express-validator

---

## ⚙️ Project Structure

ShiftMS/
├── server/ # Backend (Express.js)
│ ├── controllers/ # Business logic (auth, group, employee)
│ ├── middleware/ # Token verification, validation handlers
│ ├── models/ # Mongoose schemas (Admin, Group, Employee)
│ ├── routes/ # API endpoints
│ └── index.ts # App entry point
│
└── README.md


---

## 🔑 Environment Variables

You need to configure environment variables for both **client** and **server**:

**Backend (.env):**
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

## 🧠 API Endpoints Overview

### **Auth**
| Method | Endpoint | Description |
|:--|:--|:--|
| POST | /signup | Register a new admin |
| POST | /login | Authenticate admin and return tokens |
| POST | /refresh-token | Refresh access token using HTTP-only cookie |

### **Groups**
| Method | Endpoint | Description |
|:--|:--|:--|
| GET | /groups | Get all groups for the current admin |
| GET | /groups/:id | Get a specific group by ID |
| POST | /groups | Create a new group |
| PATCH | /groups/:id | Update group details |
| DELETE | /groups/:id | Delete a group |

### **Employees**
| Method | Endpoint | Description |
|:--|:--|:--|
| GET | /employees | Get all employees |
| POST | /employees | Add a new employee |
| DELETE | /employees/:id | Delete an employee |

---

## 🧰 Installation & Setup

```bash

git clone https://github.com/yourusername/shiftms.git
cd server
npm install
npm run dev

 The app will be available at:
 http://localhost:3000

 
