# Hamropasal — Project Audit & Implementation Plan

_Audited: 2026-07-26_

---

## 1. Repository Structure

```
PROJECTTT/
├── hamropasal-backend/   Spring Boot 4.1 / Java 21 / PostgreSQL
└── hamropasal-frontend/  React 19 / Vite 8 / Tailwind CSS 4 / TypeScript
```

---

## 2. Backend State (`hamropasal-backend`)

### Stack
- Spring Boot 4.1, Java 21
- Spring Security + JWT (jjwt 0.12.7)
- Spring Data JPA + Hibernate
- PostgreSQL (dev: `localhost:5432/hamro_pasal_DB`)
- Lombok, MapStruct, SpringDoc OpenAPI
- Base path: `/api/v1`

### Existing Modules & Assessment

| Module | Status | Notes |
|--------|--------|-------|
| **Auth** | ✅ Functional | `POST /auth/login` works; JWT generation complete; BCrypt password encoding |
| **Users** | ✅ Functional | `POST /users/register`, GET/PUT by id, paginated list |
| **Products** | ✅ Functional | Full CRUD + filter spec + pagination via `FilterProductRequest` |
| **Inventory** | ⚠️ Partial | Only `/restock` and `/sell` endpoints; **typo in path: `/inevntory`**; no GET endpoints |
| **Sales** | ⚠️ Partial | Create + GetById + GetAll; no filters/pagination/date-range; no analytics |
| **Reports/Analytics** | ❌ Missing | No endpoints exist |
| **Customers** | ❌ Missing | No module |
| **Suppliers** | ❌ Missing | No module |
| **Notifications** | ❌ Missing | `LowStockAlertService` exists (scheduler) but no REST API |
| **Dashboard stats** | ❌ Missing | No aggregation endpoints |

### Critical Issues
1. `InventoryController` mapping is `/inevntory` (typo) — needs fix
2. No CORS configuration — frontend calls will be blocked
3. No `application-prod.yaml` env var references (hardcoded DB password)
4. JWT expiry is 10 minutes — too short; no refresh token
5. No data seeding — no admin/cashier accounts exist
6. Sales missing pagination, date filters, status filters
7. No export (CSV/PDF) endpoints

---

## 3. Frontend State (`hamropasal-frontend`)

### Stack
- React 19.2, Vite 8.1, TypeScript
- Tailwind CSS 4 (with `@tailwindcss/vite` plugin)
- React Router DOM 7
- React Icons 5

### Pages & Routes

| Route | Component | Functional? |
|-------|-----------|-------------|
| `/` | `Home.tsx` | Static — no API calls |
| `/about` | `About.tsx` | Static |
| `/contact` | `Contact.tsx` | Form submits alert() only |
| `/login` | `Login.tsx` | UI only — no real auth |
| `/register` | `Register.tsx` | UI only — no real auth |
| `/dashboard` | `Dashboard.tsx` | Hardcoded mock data (setTimeout) |
| `/products` | `Products.tsx` | 2 hardcoded mock products; search/filter/sort local-only |
| `/sales` | `Sales.tsx` | 7 hardcoded mock sales; no API |
| `/inventory` | `Inventory.tsx` | 2 hardcoded mock items; no API |
| `/reports` | `Reports.tsx` | Chart placeholder; no API |
| `/settings` | `Settings.tsx` | Fully static; alert() saves |
| `/customers` | ❌ Missing | Link in nav goes to 404 |
| `/suppliers` | ❌ Missing | Link in nav goes to 404 |

### Component State

| Component | Issues |
|-----------|--------|
| `Header.tsx` | Notification count hardcoded (3); Cart hardcoded (2); Logout is `href="#"`; no auth state; `/customers` and `/suppliers` routes 404 |
| `Footer.tsx` | Copyright year hardcoded (no `new Date().getFullYear()`); social links dead |
| `ErrorBoundary.tsx` | Present — good |

### Missing Frontend Infrastructure
- No API client / base URL config
- No auth context / token storage
- No protected routes
- No toast/notification system
- No global error handling
- No form validation library

---

## 4. Non-Functional Elements (UI Inventory)

### Navigation Bar
| Element | Status |
|---------|--------|
| Logo "H" circle | Decorative placeholder |
| Nav links (Home, Products, Inventory, Sales, Reports) | Route only |
| Nav links (Customers, Suppliers) | **Dead — 404** |
| Search bar | No API call |
| Notification bell (count=3) | Hardcoded, no dropdown |
| Cart icon (count=2) | Hardcoded, wrong semantics for B2B retail |
| "Admin" user dropdown | Hardcoded name; Logout is a no-op |
| Mobile hamburger | Opens/closes only |

### Per-Page Non-Functional Buttons
| Page | Non-Functional Elements |
|------|------------------------|
| Products | Add Product, Edit (pencil), Delete (trash), Previous/Next pagination, filter dropdowns |
| Inventory | Add Item, Refresh, Edit, Delete, filter dropdowns |
| Sales | New Sale, Export, filter selects, pagination |
| Reports | Generate Report, Print, Export, chart toggle buttons |
| Settings | All Save/Reset/Connect/Toggle actions use `alert()` |
| Dashboard | Daily/Weekly/Monthly chart toggle; chart is a CSS gradient placeholder |
| Contact | Form submits `alert()` only |
| Login | No real auth — `window.location.href = '/dashboard'` after timeout |

---

## 5. Implementation Plan

### Order of Work

```
1.  Git branch setup (frontend-development)
2.  Backend fixes (CORS, inventory typo, seed script)
3.  Backend additions (Customers, Suppliers, Reports/analytics, Notifications API, Dashboard stats, Sales filters+pagination)
4.  Frontend infrastructure (API client, auth context, protected routes, toast system)
5.  Auth (Login wired to real API, token stored, navbar shows real user, logout)
6.  Products module (real CRUD, modals, pagination)
7.  Inventory module (real CRUD, real GET endpoint on backend)
8.  Sales module (real data, filters, print, CSV export)
9.  Reports module (recharts, real analytics)
10. Customers & Suppliers pages
11. Dashboard (real stats, recharts)
12. Landing page & Navbar redesign
13. Responsiveness pass
14. Final QA + README
```

### Technical Decisions
- **API client**: Axios with interceptors for auth headers + 401 redirect
- **Auth storage**: `localStorage` for JWT (simpler for local dev; note: move to httpOnly cookie for production)
- **Charts**: Recharts (lightweight, React-native, no canvas complexity)
- **Toast**: `react-hot-toast` (zero-config, accessible)
- **Form validation**: Native controlled inputs + custom validation (no extra library needed at this scale)
- **CSV export**: Browser-side for now (simple, no server dependency); PDF via `window.print()` with print stylesheet
- **Customers/Suppliers**: New backend modules + frontend pages
- **JWT expiry**: Increase to 60 min for dev; add refresh token endpoint
- **CORS**: Add `http://localhost:5173` to allowed origins in Spring config
