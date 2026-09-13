# To-Do List API

A clean, type-safe REST API for managing to-do tasks, built with **Express**, **TypeScript**, **TypeORM**, and **PostgreSQL**. Request validation is handled with **Zod**, and errors flow through a centralized error-handling pipeline for consistent, predictable responses.

## Features

- **Full CRUD** for tasks — create, read, update, and delete
- **Schema validation** on every write via [Zod](https://zod.dev/), with field-level error messages
- **Centralized error handling** through a custom `AppError` class and Express error middleware
- **Consistent JSON envelope** (`success`, `data` / `message`) across all responses
- **PostgreSQL persistence** via TypeORM, with UUID primary keys
- **100% TypeScript**, running natively on Node.js via `tsx` (no manual build step in development)

## Tech Stack

| Layer          | Technology                          |
| -------------- | ------------------------------------ |
| Runtime        | Node.js (see `.nvmrc`)               |
| Framework      | Express 5                            |
| Language       | TypeScript                           |
| ORM            | TypeORM                              |
| Database       | PostgreSQL                           |
| Validation     | Zod                                  |
| Dev tooling    | tsx (watch mode)                     |

## Project Structure

```
src/
├── app.ts                        # Express app setup & middleware wiring
├── server.ts                     # Entry point — starts the HTTP server
├── controllers/
│   └── task.controller.ts        # Request handlers for the tasks resource
├── services/
│   └── task.service.ts           # Business logic / database access
├── entities/
│   └── task.entity.ts            # TypeORM Task entity
├── routes/
│   └── task.routes.ts            # /api/tasks route definitions
├── validations/
│   └── task.validation.ts        # Zod schemas for request bodies
├── middlewares/
│   ├── validation.middleware.ts  # Generic Zod-based request validator
│   ├── error.middleware.ts       # Centralized error handler
│   └── routes.middleware.ts      # Catch-all 404 handler
├── utils/
│   ├── apiResponse.ts            # Standard success response helper
│   ├── appError.ts               # Custom operational error class
│   └── asyncHandler.ts           # Wraps async route handlers for error propagation
└── database/
    └── data-source.ts            # TypeORM DataSource configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version pinned in `.nvmrc`)
- A running [PostgreSQL](https://www.postgresql.org/) instance

### Installation

```bash
git clone https://github.com/Abu5ald1/To-Do-List.git
cd To-Do-List
npm install
```

### Configuration

Copy the example environment file and fill in your database credentials:

```bash
cp .env.example .env
```

| Variable      | Description                       | Example       |
| ------------- | ---------------------------------- | ------------- |
| `DB_HOST`     | PostgreSQL host                    | `127.0.0.1`   |
| `DB_PORT`     | PostgreSQL port                    | `5432`        |
| `DB_USERNAME` | PostgreSQL username                | `postgres`    |
| `DB_PASSWORD` | PostgreSQL password                | `your_password` |
| `DB_NAME`     | Database name                      | `to-do-list`  |

### Run the server

```bash
npm run dev
```

The API will start on **http://localhost:3000**, and the database schema is synchronized automatically on startup (via TypeORM's `synchronize` option).

## API Reference

Base URL: `/api/tasks`

| Method   | Endpoint | Description          | Body                                      |
| -------- | -------- | -------------------- | ------------------------------------------ |
| `GET`    | `/`      | List all tasks       | —                                           |
| `GET`    | `/:id`   | Get a task by ID     | —                                           |
| `POST`   | `/`      | Create a new task    | `{ "title": string, "completed"?: boolean }` |
| `PATCH`  | `/:id`   | Update an existing task | `{ "title"?: string, "completed"?: boolean }` |
| `DELETE` | `/:id`   | Delete a task         | —                                           |

### Task shape

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Buy groceries",
  "completed": false
}
```

### Example: create a task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'
```

```json
{
  "success": true,
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "Buy groceries",
    "completed": false
  }
}
```

### Response format

All successful responses follow the same envelope:

```json
{
  "success": true,
  "data": {}
}
```

Errors (validation failures, not-found resources, etc.) return:

```json
{
  "success": false,
  "message": "Task not found",
  "errors": []
}
```

## License

Released under the [ISC License](LICENSE).
