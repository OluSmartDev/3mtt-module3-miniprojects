# 📚 3MTT Mini Project 3 - User Management API

The objective of this project is to provide a simple Express.js API that connects to a PostgreSQL Database and performs a basic database operations commonly referred to as CRUD.

This project is a simple Express.js application with PostgreSQL integration for managing users. It provides RESTful endpoints to perform CRUD (Create, Read, Update, Delete) operations on a `users` table in a PostgreSQL database.

The handlers's logic for the routes that are defined in the `usersRouter.js` file are contained in the `usersController.js` file.

---

## 📦 Features

✅ RESTful API with full CRUD functionality  
✅ PostgreSQL integration  
✅ Error handling for invalid routes & server errors  
✅ Modular structure using Express Routers and Controllers  
✅ Example Postman requests included  

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (installed and running locally or accessible via remote host)
- Postman or any HTTP client for testing

### Step-by-step Guide

1. **Clone the repository**:
   ```
   git clone https://github.com/OluSmartDev/3mtt-module3-miniprojects.git
   cd 3mtt-module3-miniprojects/03-store-and-retrieve-data-in-postgresql
   ```

2. **Install dependencies**:
  ```
   npm install
   ```

3. **Set up PostgreSQL database**:

   Make sure you have PostgreSQL installed and running. Then create a new database:

   ```sql
   CREATE DATABASE "3mtt-mini-project3";
   ```

   Connect to the database and create the `users` table:

   ```sql
   
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100) UNIQUE,
     age INT
   );
   ```

4. **Configure database credentials**:

   Create a `.env` file in the project's root folder and ensure the  configuration values match your PostgreSQL setup:

   ```js
    DB_SERVER="localhost"
    DB_PORT=5432
    DB_NAME="YOUR_DATABASE_NAME"
    DB_USER="YOUR_DATABASE_USERNAME"
    DB_PASSWORD="YOUR_DATABASE_PASSWORD"
   ```

5. **Start the server**:
   ```bash
   node index.js 
   ```
   The server will start on port `5000`.
   (Note: You may start the server with `npm run start` or with `npm run dev` if you install the developer dependency called `nodemon`).

---

## 🌐 API Documentation

Below are the available endpoints along with sample **Postman** requests and expected responses.

---

### 🧾 Base URL

```
http://localhost:5000
```

---

### 🔹 GET /users

**Description:** Retrieves all users from the database.

**Method:** `GET`

**URL:**  
```
http://localhost:5000/users
```

**Expected Response (Success):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  },
  ...
]
```

**Expected Response (No Users):**
```json
{
  "message": "No user is found. The table is empty!"
}
```

---

### 🔹 GET /users/:id

**Description:** Retrieves a single user by their ID.

**Method:** `GET`

**URL Example:**  
```
http://localhost:5000/users/1
```

**Expected Response (Success):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
]
```

**Expected Response (Not Found):**
```json
{
  "error": "User with ID 999 not found"
}
```

---

### 🔹 POST /users

**Description:** Creates a new user.

**Method:** `POST`

**URL:**  
```
http://localhost:5000/users
```

**Body (raw JSON):**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28
}
```

**Expected Response (Success):**
```
Database response object or success message
```

**Expected Response (Validation Error / Duplicate Email):**
```json
{
  "error": "An error occurred while adding the user.",
  "details": "duplicate key value violates unique constraint..."
}
```

---

### 🔹 PUT /users/:id

**Description:** Updates an existing user by ID fully or partially.  
_(fully when you update all the three fields, or partially when you update at least one of the fileds)_

**Method:** `PUT`

**URL Example:**  
```
http://localhost:5000/users/1
```

**Body (raw JSON):**
```json
{
  "age": 31
}
```

**Expected Response (Success):**
```json
{
  "message": "Database updated successfully!"
}
```

**Expected Response (User Not Found):**
```json
{
  "error": "User with ID 999 not found."
}
```

**Expected Response (No Fields Provided):**
```json
{
  "error": "At least one field (name, email, or age) must be provided for update."
}
```

---

### 🔹 DELETE /users/:id

**Description:** Deletes a user by ID.

**Method:** `DELETE`

**URL Example:**  
```
http://localhost:5000/users/1
```

**Expected Response (Success):**
```json
{
  "message": "User with ID 1 has been successfully deleted"
}
```

**Expected Response (User Not Found):**
```json
{
  "message": "User with ID 999 not found."
}
```

---

## ⚠️ Error Handling

All routes implement consistent error handling:

| Status Code | Description                     |
|-------------|---------------------------------|
| `400`       | Bad request (e.g., missing data)|
| `404`       | Resource not found              |
| `500`       | Internal Server Error           |

---

## ✅ Testing Tips with Postman

1. For `POST` and `PUT` requests:
   - Set the **Body** tab to `raw` and choose `JSON`.
   - Input the required fields as shown in examples.
2. For `GET` and `DELETE`, no body is required.
3. Check the **Status** and **Response** tabs to verify the result.

---

## 📁 Project Structure

```
project-root/
├── index.js
├── utils/
│   └── dbconnect.js
├── routes/
│   └── usersRouter.js
├── controllers/
│   └── usersController.js
└── README.md
```

---

## 🚀 Author

OluSmartDev  
📧 olusmartdev@gmail.com  
📅 May 2025