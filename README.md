# Mock API Server

This is a simple mock API server created with Express and TypeScript.

## Installation

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```

## Running the Server

To start the server, run the following command:

```bash
npx ts-node server.ts
```

The server will start on `http://localhost:3009`.

## Available Endpoints

### Authentication

#### `POST /api/token`

Authenticates a client and returns an access token.

**Request Body:**

```json
{
  "user_id": "",
  "secret": ""
}
```

**Success Response (201):**

```json
{
  "access_token": "12345",
  "expires_in": 3600
}
```

**Error Response (401):**

```json
{
  "message": "Credenciais inválidas"
}
```

### Users

All user endpoints require a valid Bearer token in the `Authorization` header.
`Authorization: Bearer MOCKED_BEARER_TOKEN_ABC123XYZ`

#### `GET /api/users`

Returns a list of mock users.

**Success Response (200):**

```json
[
  { "id": 1, "name": "Mock User 1", "email": "mock1@example.com" },
  { "id": 2, "name": "Mock User 2", "email": "mock2@example.com" }
]
```

#### `POST /api/users`

Creates a new mock user.

**Request Body:**

```json
{
  "name": "New Mock User",
  "email": "newmock@example.com"
}
```

**Success Response (201):**

The newly created user object, including a randomly generated `id`.

```json
{
  "id": 583,
  "name": "New Mock User",
  "email": "newmock@example.com"
}
```
