# README.md

---

## 📦 Item Management API

The goal of this project is to evaluate my ability to create a simple REST API using Express.js. It demonstrates my understanding of Node.js, Express.js, and RESTful API principles.  

This is a simple RESTful API for managing items in an in-memory storage. The API allows you to perform CRUD (Create, Read, Update, Delete) operations on items.

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps to Run the Application

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/OluSmartDev/3mtt-module3-miniprojects.git
   cd 3mtt-module3-miniprojects/02-simple-rest-api-with-express-js
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

   The server will start running at `http://localhost:5000`.

---

## 📘 API Documentation

Base URL: `http://localhost:5000`

All data is sent and received as JSON.

---

### 🧾 Items Endpoints

#### 1. Get All Items

- **Method**: `GET`
- **Endpoint**: `/items/`
- **Description**: Retrieves a list of all items.

##### ✅ Example Request:
```http
GET http://localhost:5000/items
```

##### 💡 Example Response (200 OK):
```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
    "name": "Item One",
    "description": "First item"
  }
]
```

---

#### 2. Get Single Item by ID

- **Method**: `GET`
- **Endpoint**: `/items/:id`
- **Description**: Retrieves a single item by its UUID.

##### ✅ Example Request:
```http
GET http://localhost:5000/items/a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8
```

##### 💡 Example Response (200 OK):
```json
{
  "id": "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
  "name": "Item One",
  "description": "First item"
}
```

##### ❌ Error Responses:
- **400 Bad Request** if ID is not a valid UUID.
- **404 Not Found** if no item exists with the given ID.

---

#### 3. Create a New Item

- **Method**: `POST`
- **Endpoint**: `/items/`
- **Description**: Creates a new item with a generated ID.

##### ✅ Example Request:
```http
POST http://localhost:5000/items
Content-Type: application/json

{
  "name": "New Item",
  "description": "This is a new item"
}
```

##### 💡 Example Response (201 Created):
```json
{
  "message": "An item named New Item was created successfully"
}
```

##### ❌ Error Responses:
- **400 Bad Request** if `name` or `description` are missing or invalid.
- **500 Internal Server Error** if something goes wrong during creation.

---

#### 4. Update an Existing Item

- **Method**: `PUT`
- **Endpoint**: `/items/:id`
- **Description**: Updates an existing item's name and description.

##### ✅ Example Request:
```http
PUT http://localhost:5000/items/a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

##### 💡 Example Response (200 OK):
```json
{
  "id": "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
  "name": "Updated Name",
  "description": "Updated description"
}
```

##### ❌ Error Responses:
- **400 Bad Request** if parameters or body contain invalid data.
- **404 Not Found** if item does not exist.
- **500 Internal Server Error** if update fails.

---

#### 5. Delete an Item

- **Method**: `DELETE`
- **Endpoint**: `/items/:id`
- **Description**: Deletes an item by its ID.

##### ✅ Example Request:
```http
DELETE http://localhost:5000/items/a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8
```

##### 💡 Example Response (200 OK):
```json
{
  "message": "item with ID a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8 has been successfully deleted"
}
```

##### ❌ Error Responses:
- **400 Bad Request** if ID is invalid.
- **404 Not Found** if item doesn't exist.

---

## 🧪 Testing with Postman

You can test this API using [Postman](https://www.postman.com/) or any other HTTP client:

1. Open Postman.
2. Set the request method (`GET`, `POST`, `PUT`, `DELETE`) accordingly.
3. Enter the full URL (e.g., `http://localhost:5000/items`).
4. For `POST` and `PUT`, add the raw JSON body under **Body > raw > JSON**.
5. Send the request and view the response.

---

## 🛑 Error Responses

| Status Code | Description                    |JSON Response
|-------------|--------------------------------|---------------------------------------------------------
| 400         | Invalid request (params/body)  |{"error": "Invalid request parameter", "details": [...]}
| 404         | Route or item not found        |{"message": "Route not found"}
| 500         | Internal server error          |{"error": "Internal server error"}

---

## 📝 Notes

- Data is stored in memory, so it resets every time the server restarts.
- UUIDs are used to ensure unique IDs for each item.
- Input validation is handled via `express-validator`.

---

## 🚀 Author

OluSmartDev  
📧 olusmartdev@gmail.com  
📅 May 2025

--- 