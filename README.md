# Hamropasal — Retail Management System

A full-stack retail management system built for Nepali businesses. Features inventory control, sales POS, customer/supplier management, analytics, and role-based access control.

---

## Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS v4 |
| Backend  | Spring Boot 4.1, Java 21, Spring Security + JWT |
| Database | PostgreSQL (local) |
| Auth     | JWT access tokens, bcrypt passwords |

---

## Local Dev Setup

### Prerequisites
- Java 21+
- Node.js 20+
- PostgreSQL 15+ running locally

### 1. Database

Create a PostgreSQL database:

```sql
CREATE DATABASE hamropasal;
```

### 2. Backend

```bash
cd hamropasal-backend
cp .env.example .env
# Edit .env with your DB credentials
./mvnw spring-boot:run
```

Backend runs on **http://localhost:8080**

Key env vars (see `.env.example`):
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/hamropasal
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=yourpassword
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRATION=86400000
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=yourapppassword
```

The DataSeeder runs automatically on first startup and creates seed data (users, categories, products, customers, suppliers).

### 3. Frontend

```bash
cd hamropasal-frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## Local Dev Credentials

| Role    | Email                       | Password     |
|---------|----------------------------|--------------|
| Admin   | admin@hamropasal.com       | admin123     |
| Cashier | cashier@hamropasal.com     | cashier123   |

> These are seeded automatically by `DataSeeder` on first application start.

---

## API Endpoints

| Module      | Base Path               |
|-------------|------------------------|
| Auth        | `POST /auth/login`, `POST /auth/register` |
| Products    | `/products` (CRUD + filter + pagination) |
| Categories  | `/category` (CRUD) |
| Inventory   | `/inventory` (list, restock, threshold, low-stock) |
| Sales       | `/sales` (create, list, get by id) |
| Customers   | `/api/v1/customers` (CRUD + search + pagination) |
| Suppliers   | `/api/v1/suppliers` (CRUD + search) |
| Reports     | `/api/v1/reports/dashboard/stats`, `/api/v1/reports/monthly-revenue` |

Full Swagger UI available at: **http://localhost:8080/swagger-ui/index.html**

---

## Features

- **Dashboard** — real-time stats: monthly revenue, today's sales, low stock alerts, recent transactions
- **Products** — full CRUD with search/filter by name, category, price range; pagination
- **Inventory** — stock tracking, restock modal, configurable low-stock thresholds
- **Sales / POS** — new sale modal with product search, cart, tax%, payment method; print receipt; CSV export
- **Reports** — monthly bar chart, payment method breakdown, transaction history; CSV export
- **Customers** — CRUD with search and pagination; loyalty points tracking
- **Suppliers** — CRUD with search; payment terms management
- **Auth** — JWT login/register, bcrypt hashed passwords, role-based routes (Admin / Cashier)

---

## Git Branch

All development work is on the `frontend-development` branch.

---

## Known Limitations / Follow-up

- Email notifications require a valid SMTP configuration (see env vars)
- Sales report endpoint returns empty list (needs date-range query implementation in backend)
- PDF export not yet implemented (CSV export works for all modules)
- Refresh token / token rotation not implemented yet
- No automated test suite — manual testing only
