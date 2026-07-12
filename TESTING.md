# API Testing Summary

This document confirms that all 5 REST endpoints of the Items API were tested manually using PowerShell's `curl` (an alias for `Invoke-WebRequest`) and returned the expected HTTP status codes and response bodies.

**Base URL:** `http://localhost:3000`

---

## 1. GET /api/items — Retrieve all items

**Command:**
```powershell
curl http://localhost:3000/api/items
```

**Result:** `200 OK`
```json
[]
```
Confirms the endpoint responds successfully and returns an empty array before any items have been created.

---

## 2. POST /api/items — Create a new item

**Command:**
```powershell
curl -Method POST http://localhost:3000/api/items -Body '{"title":"Buy milk"}' -ContentType "application/json"
```

**Result:** `201 Created`
```json
{"data":{"id":"1783823420088","title":"Buy Milk"}}
```
Confirms a new item is created with an auto-generated unique `id`, and the correct `201` status is returned.

---

## 3. GET /api/items/:id — Retrieve a specific item

**Command:**
```powershell
curl http://localhost:3000/api/items/1783823420088
```

**Result:** `200 OK`
```json
{"id":"1783823420088","title":"Buy Milk"}
```
Confirms a single item can be retrieved by its `id`.

### Negative test — nonexistent ID

**Command:**
```powershell
curl http://localhost:3000/api/items/99999999
```

**Result:** `404 Not Found`
```json
{"error":"Item not found"}
```
Confirms the API correctly returns a `404` when the requested `id` does not exist.

---

## 4. PUT /api/items/:id — Update an existing item

**Command:**
```powershell
curl -Method PUT http://localhost:3000/api/items/1783823420088 -Body '{"title":"Buy oat milk"}' -ContentType "application/json"
```

**Result:** `200 OK`
```json
{"id":"1783823420088","title":"Buy oat milk"}
```
Confirms the item's `title` field was successfully overwritten.

### Negative test — missing required field

**Command:**
```powershell
curl -Method PUT http://localhost:3000/api/items/1783823420088 -Body '{}' -ContentType "application/json"
```

**Result:** `400 Bad Request`
```json
{"error":"Title is required"}
```
Confirms the API validates incoming data and rejects updates missing a `title`.

---

## 5. DELETE /api/items/:id — Delete an item

**Command:**
```powershell
curl -Method DELETE http://localhost:3000/api/items/1783823420088
```

**Result:** `200 OK`
```json
{"data":"Item with id 1783823420088 deleted successfully"}
```
Confirms the item was successfully deleted and a confirmation message was returned.

### Verification — item no longer exists

**Command:**
```powershell
curl http://localhost:3000/api/items/1783823420088
```

**Result:** `404 Not Found`
```json
{"error":"Item not found"}
```
Confirms the item was actually removed from the in-memory data store, not just marked as deleted.

---

## Summary Table

| Method | Endpoint            | Scenario           | Expected Status | Actual Status | Result |
|--------|----------------------|---------------------|:---------------:|:--------------:|:------:|
| GET    | `/api/items`          | No items yet        | 200              | 200             | ✅ |
| POST   | `/api/items`          | Valid title         | 201              | 201             | ✅ |
| GET    | `/api/items/:id`      | Existing item        | 200              | 200             | ✅ |
| GET    | `/api/items/:id`      | Nonexistent item    | 404              | 404             | ✅ |
| PUT    | `/api/items/:id`      | Valid update        | 200              | 200             | ✅ |
| PUT    | `/api/items/:id`      | Missing title       | 400              | 400             | ✅ |
| DELETE | `/api/items/:id`      | Existing item        | 200              | 200             | ✅ |
| GET    | `/api/items/:id`      | After deletion        | 404              | 404             | ✅ |

All endpoints behaved as expected across both success and failure scenarios.
