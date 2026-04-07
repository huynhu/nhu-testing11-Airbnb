# nhu-testing11-Airbnb

# 🏡 Airbnb Clone - Automation Testing (Playwright + TypeScript)

## 📌 Overview

This project is an automation testing framework for an **Airbnb Clone application**.

The system includes core features such as:

- User authentication (Sign up / Login)
- Search & filter listings
- Property details
- Booking flow
- Payment flow (if applicable)

👉 The automation framework is built using **Playwright with TypeScript** following best practices for scalability and maintainability.

---

## 🧰 Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- Page Object Model (POM)

---

## 🎯 Test Scope

### ✅ Functional Areas Covered

- Authentication (Sign up / Login / Logout)
- Search location (Ho Chi Minh, Da Nang, etc.)
- View property details
- Booking flow
- UI validation

👉 These are core features of an Airbnb-like system [oai_citation:1‡GitHub](https://github.com/bcs08-group5-airbnb/airbnb-frontend?utm_source=chatgpt.com)

---

## 📁 Project Structure

project-root/
│
├── tests/ # Test cases
│ ├── auth/
│ ├── booking/
│ ├── search/
│
├── pages/ # Page Object classes
│ ├── basePage.ts
│ ├── homePage.ts
│ ├── loginPage.ts
│ ├── bookingPage.ts
│
├── locators/ # Optional locator files
├── utils/ # Helper functions
├── fixtures/ # Test data
│
├── playwright.config.ts
├── package.json
└── README.md

---

## ⚙️ Installation

### 1. Clone repository

```bash
git clone <your-repo-url>
cd project-root
```

### 2. Install Playwright

npm init playwright@latest .

### 3. Install Playwright browsers

npx playwright install

▶️ Run Tests

Run all tests
npx playwright test

🔥 Test Scenarios (QA Focus)

🔐 Authentication
• Login with valid / invalid credentials
• Signup validation

⸻

🔍 Search
• Search by location
• Invalid search input
• Empty search

⸻

🏡 Booking
• Select property
• Choose date
• Confirm booking

👉 Booking system is a core feature of Airbnb-like apps ￼

⸻

💳 Payment (if available)
• Valid / invalid card
• Payment failure
• Retry payment

Allure Report shows
allure serve allure-results

Install fake data
npm install @faker-js/faker
