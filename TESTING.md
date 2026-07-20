# API Testing Documentation

This document demonstrates successful testing of all 5 REST endpoints against a live MongoDB Atlas database, using the VS Code **REST Client** extension (`requests.http`).

Base URL: `http://localhost:3000/api/items`

---

## 1. GET /api/items — Retrieve all items

**Request**
```http
GET http://localhost:3000/api/items
```

**Response**
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[]
```

Confirms the route successfully connects to the MongoDB `items` collection and returns an array (empty prior to any inserts).

---

## 2. GET /api/items/:id — Retrieve one item by id

### Case A: Invalid id format

**Request**
```http
GET http://localhost:3000/api/items/12345
```

**Response**
```
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
  "error": "Item not found"
}
```

Confirms malformed ids (not a valid MongoDB ObjectId) are caught and return a clean `404` instead of a server error.

### Case B: Valid id, item exists

**Request**
```http
GET http://localhost:3000/api/items/6a5d91548a911ef9d50ca564
```

**Response**
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "_id": "6a5d91548a911ef9d50ca564",
  "title": "Buy milk",
  "createdAt": "2026-07-20T03:09:08.473Z",
  "updatedAt": "2026-07-20T03:09:08.473Z",
  "__v": 0
}
```

---

## 3. POST /api/items — Create a new item

**Request**
```http
POST http://localhost:3000/api/items
Content-Type: application/json

{
  "title": "Buy milk"
}
```

**Response**
```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "data": {
    "title": "Buy milk",
    "_id": "6a5d91548a911ef9d50ca564",
    "createdAt": "2026-07-20T03:09:08.473Z",
    "updatedAt": "2026-07-20T03:09:08.473Z",
    "__v": 0
  }
}
```

Confirms the new document is validated, inserted into MongoDB Atlas, and returned with its database-generated `_id` and timestamps, with a `201` status.

---

## 4. PUT /api/items/:id — Update an existing item

**Request**
```http
PUT http://localhost:3000/api/items/6a5d91548a911ef9d50ca564
Content-Type: application/json

{
  "title": "Buy oat milk"
}
```

**Response**
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "_id": "6a5d91548a911ef9d50ca564",
  "title": "Buy oat milk",
  "createdAt": "2026-07-20T03:09:08.473Z",
  "updatedAt": "2026-07-20T03:21:44.417Z",
  "__v": 0
}
```

Confirms the document was updated in place — `title` changed and `updatedAt` advanced, while `createdAt` and `_id` remained unchanged.

---

## 5. DELETE /api/items/:id — Delete an item

### Case A: Item exists

**Request**
```http
DELETE http://localhost:3000/api/items/6a5d91548a911ef9d50ca564
```

**Response**
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": "Item with id 6a5d91548a911ef9d50ca564 deleted successfully"
}
```

### Case B: Same item deleted again (no longer exists)

**Request**
```http
DELETE http://localhost:3000/api/items/6a5d91548a911ef9d50ca564
```

**Response**
```
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
  "error": "Item not found"
}
```

Confirms the delete operation permanently removes the document from Atlas, and a repeat delete on the same id correctly returns a `404` rather than a false success.

---

## Summary

| Method | Endpoint | Status Codes Verified |
|--------|----------|------------------------|
| GET | `/api/items` | 200 |
| GET | `/api/items/:id` | 200, 404 |
| POST | `/api/items` | 201 |
| PUT | `/api/items/:id` | 200 |
| DELETE | `/api/items/:id` | 200, 404 |

All endpoints tested against a live MongoDB Atlas cluster using Mongoose, with `ObjectId` validation and Mongoose schema validation in place.