# API Specification

This document outlines the API requirements based on the existing modules in the application. It details the endpoints, request bodies, and response structures expected by the frontend repositories.

## 1. Auth Module

**Repository**: `AuthRepository`
**Base Endpoint**: `/auth`

| Operation | Method | Endpoint | Request Body | Response |
|-----------|--------|----------|--------------|----------|
| Login | POST | `/auth/login` | `{ email: string, pass: string }` | `User` |
| Register | POST | `/auth/register` | `{ email: string, pass: string, name: string }` | `User` |
| Logout | POST | `/auth/logout` | - | `void` |
| Get Current User | GET | `/auth/me` | - | `User` |
| Recover Password | POST | `/auth/recover-password` | `{ email: string }` | `void` |
| Login with Google | POST | `/auth/google` | - | `User` |

### Data Structures

```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  photoUrl?: string;
}
```

---

## 2. Balance Module

**Repository**: `AccountRepository`
**Base Endpoint**: `/accounts`

| Operation | Method | Endpoint | Request Body | Response |
|-----------|--------|----------|--------------|----------|
| Get Account Detail | GET | `/accounts/:id` | - | `AccountDetail` |
| Add Account | POST | `/accounts` | `Account` | `void` |

### Data Structures

```typescript
interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  color: string;
  icon: string; // Ionicons name
  type: 'cash' | 'bank' | 'card' | 'other';
  percentage?: number; // Calculated field for UI
}

interface AccountDetail extends Account {
  transactions: Transaction[];
}

// Transaction specific to Account context
interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO Date string
  currency: string;
  type: 'income' | 'expense';
  categoryIcon?: string;
  categoryName?: string;
  categoryColor?: string;
}
```

---

## 3. Categories Module

**Repository**: `CategoryRepository`
**Base Endpoint**: `/categories`

| Operation | Method | Endpoint | Request Body | Response |
|-----------|--------|----------|--------------|----------|
| Get Categories | GET | `/categories` | - | `Category[]` |

### Data Structures

```typescript
interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
```

---

## 4. Expenses Module

**Repository**: `ExpenseRepository`
**Base Endpoint**: `/expenses`

| Operation | Method | Endpoint | Request Body | Response |
|-----------|--------|----------|--------------|----------|
| Create Expense | POST | `/expenses` | `Omit<Expense, 'id'>` | `Expense` |
| Get All Expenses | GET | `/expenses` | - | `Expense[]` |

### Data Structures

```typescript
interface Expense {
  id: string;
  category: string;
  amount: number;
  currency: string;
  date: Date;
  time: string;
  name: string;
  isPaid: boolean;
}
```

---

## 5. Goals Module

**Repository**: `GoalRepository`
**Base Endpoint**: `/goals`

| Operation | Method | Endpoint | Request Body | Response |
|-----------|--------|----------|--------------|----------|
| Get Goals | GET | `/goals` | - | `Goal[]` |
| Get Borrowed | GET | `/goals/borrowed` | - | `Goal[]` |
| Get Lent | GET | `/goals/lent` | - | `Goal[]` |
| Create Goal | POST | `/goals` | `Omit<Goal, 'id'>` | `void` |

### Data Structures

```typescript
interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
  category: string;
  notes?: string;
  date: string;
  imageUrl?: string;
}
```

---

## 6. Income Module

**Repository**: `IncomeRepository`
**Base Endpoint**: `/income`

| Operation | Method | Endpoint | Request Body | Response |
|-----------|--------|----------|--------------|----------|
| Create Income | POST | `/income` | `Omit<Income, 'id'>` | `Income` |
| Get All Income | GET | `/income` | - | `Income[]` |

### Data Structures

```typescript
interface Income {
  id: string;
  category: string; // Likely referencing Category ID
  amount: number;
  currency: string;
  date: Date;
  time: string;
  name: string;
  isPaid: boolean;
  notes?: string;
  repeat?: string;
  remind?: string;
  goalOrDebt?: string;
}
```

---

## 7. Transactions Module

**Repository**: `TransactionRepository`
**Base Endpoint**: `/transactions`

| Operation | Method | Endpoint | Request Body | Response |
|-----------|--------|----------|--------------|----------|
| Get By ID | GET | `/transactions/:id` | - | `Transaction | null` |

### Data Structures

```typescript
interface Transaction {
  id: string;
  category: {
    name: string;
    color: string;
  };
  description: string;
  amount: number;
  date: string;
  sum: number;
  balance: number;
  currency: string;
  account: {
    name: string;
  };
}
```

## 8. Calendar Module (Notes)

Currently, the Calendar module generates data locally (`GenerateCalendarData` use case). However, for a full API implementation, it would likely require an endpoint to fetch transactions within a date range to populate the calendar.

**Suggested Endpoint**:
- `GET /transactions?startDate=...&endDate=...`
- Response: `Transaction[]`
