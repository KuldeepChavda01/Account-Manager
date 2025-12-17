# 🚀 React User Management System

A robust, frontend-only user management application featuring secure authentication patterns, state persistence, and protected routing. This project was built to demonstrate a deep understanding of React's lifecycle and state management.

---

## 🔗 Live Demo

**View the live project here:** [Click Here](https://acc-management-system.netlify.app)

---

## 📝 Project Overview

This application allows users to create accounts, log in securely, and manage their profile details. It simulates a full-stack experience by using the browser's **LocalStorage** as a database, ensuring that user data and login sessions persist even after a page refresh.

## 🛠️ Tech Stack

- **Framework:** React (Vite + JavaScript)
- **State Management:** React Context API (Provider Pattern)
- **Routing:** React Router DOM (v6)
- **Persistence:** Window LocalStorage API
- **Styling:** Custom CSS (Responsive Design)
- > **Note:** Leveraging my 1+ years of CSS experience, I implemented a custom design to ensure a polished, professional UI. The architecture is modular, meaning if a team prefers **Bootstrap**, it can be integrated seamlessly by linking the framework and applying classes without needing to rewrite any of the core application logic.

---

## 📂 Folder Structure

```text
src/
├── assets/            # Assets like fonts
├── components/        # UI Components and Logic
│   ├── Account.jsx
│   ├── Login.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── Registration.jsx
├── context/           # Global State Management
│   ├── authContext.jsx
│   └── AuthState.jsx
├── App.css            # Component-specific styles
├── App.jsx            # Routing and Provider setup
├── index.css          # Global styles and resets
└── main.jsx           # Application entry point

```

---

## ✨ Key Features

### 🔐 Authentication System

- **Registration:** Allows new users to sign up with name, email, and password. Includes a check to prevent duplicate emails.
- **Login:** Validates credentials against stored users and creates a persistent session.

### 🛡️ Protected Routes

- Implemented a custom `ProtectedRoute` wrapper component.
- Prevents unauthorized users from accessing the `/account` page.
- Automatically redirects non-logged-in users back to the login screen.

### 👤 Profile Management

- Users can view their registered details.
- Integrated "Edit Mode" allows users to update name, email, or password.
- Updates are synced instantly across the Global State and LocalStorage.

---

## 🧠 Technical Highlights

- **The Provider Pattern:** Used `AuthContext.Provider` to manage global user state.
- **Custom Route Guards:** Mastered the use of the `children` prop for security wrappers.
- **Synchronization:** Kept UI state in sync with persistent browser storage.
- **Clean Code Practices:** Decoupled business logic from UI components.

---

## 🚀 Setup & Installation

1. **Clone the repository:**

```bash
git clone https://github.com/KuldeepChavda01/Account-Manager.git

```

2. **Install dependencies:**

```bash
npm install

```

3. **Start the development server:**

```bash
npm run dev

```

---

## 📄 Core Implementation

- **Functionality:** All requirements (Login, Register, Edit Profile) are fully operational.
- **Code Quality:** Modular architecture with separated concerns.
- **Error Handling:** Form validations and navigation guards are active.
- **Documentation:** Clear setup instructions and technical breakdown provided.
