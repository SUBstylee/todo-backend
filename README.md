# Todo App - Local Development Guide

This guide provides step-by-step instructions for running the Todo App locally, including both the frontend and backend, and setting up the database with Prisma.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MySQL](https://www.mysql.com/) or compatible database

---

## 1. Clone the Repositories

Open a terminal and run:

```bash
git clone git@github.com:SUBstylee/todo-backend.git
git clone git@github.com:SUBstylee/todo-frontend.git
```

---

## 2. Backend Setup

### 2.1 Install Dependencies

```bash
cd todo-backend
npm install
```

### 2.2 Configure Environment Variables

Create a `.env` file in `todo-backend`:

```env
PORT=5001
DATABASE_URL="mysql://todo_user:password@localhost:3306/todo_db"
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 2.3 Prepare the Database

1. Start your MySQL server.
2. Create the database and user if needed:

```sql
CREATE DATABASE todo_db;
CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON todo_db.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;
```

3. Run Prisma migrations and (optionally) seed:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 2.4 Start the Backend Server

```bash
npm run dev
```

The backend should now be running at [http://localhost:5001](http://localhost:5001).

---

## 3. Frontend Setup

### 3.1 Install Dependencies

```bash
cd ../todo-frontend
npm install
```

### 3.2 Configure Environment Variables

Create a `.env` file in `todo-frontend`:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:5001"
```

### 3.3 Start the Frontend

```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000).

---

## 4. Test the App

- **Backend health check:**  
  Visit [http://localhost:5001/health](http://localhost:5001/health) in your browser. It should show "Server is healthy".
- **Frontend:**  
  Go to [http://localhost:3000](http://localhost:3000) and use the Todo app (add, complete, edit, and delete tasks).

Additionally you can run tests on both Frontend and Backend:

```bash
npm run test
```

---

## 5. Troubleshooting

- **Backend database errors:** Ensure MySQL is running and `DATABASE_URL` is correct in `.env`.
- **Frontend can't fetch data:** Make sure the backend is running and `NEXT_PUBLIC_API_BASE_URL` is correct.
- **404 errors:** Check that the backend server is running and your routes are correct.
