# Pharmacy Management
This is the **frontend** for the **Pharmacy Management System**, built with React, Vite, TailwindCSS, and TypeScript.

---

## System Requirements
- **Node.js** v18.18.0 or higher (**LTS recommended**)
- **npm** v9.x.x or v10.x.x

---


## Installation

### 1. Install Dependencies:
```bash
npm install
# or
yarn install
```

> **Tip:** If you face dependency resolution issues, try:
>
> ```bash
> npm install --legacy-peer-deps
> ```

### 2. Start Development Server:
```bash
npm run dev
# or
yarn dev
```


## Contribution Guidelines

To maintain code quality and consistency, please adhere to the following guidelines when contributing to the project.

### General Principles
- **Keep it DRY:** Don't repeat yourself. Utilize existing services, actions, and helpers where possible.
- **Permissions over Roles:** Whenever checking for authorization, prefer using specific permissions, hasPermissions("update-customer"). This makes the system more flexible.

### Git Workflow
1.  **Create a Feature/Bug/Enhancement Branch:** All new work should be done on a feature/bug branch as required.
    ```bash
    # Example:
    git checkout -b feature/user-export-endpoint
    git checkout -b bug/invalid-status-code
    git checkout -b enhancement/improve-export-performance
    ```
2.  **Write Clear Commit Messages:** Write a concise, imperative-style subject line (e.g., "Add user export functionality"). Add more details in the body if necessary.
3.  **Submit a Merge Request:** Once your feature is complete and tested, push your branch and create a Merge Request against the `staging` branch.

### Coding Standards
- **Run ESLint before pushing:**
    ```bash
    npm run lint
    ```

---

## Notes
- **Environment Variables:** Make sure to copy `.env.example` to `.env` and configure as needed.
- All API endpoints and configurations should be managed through environment variables.
- For UI consistency, follow the design patterns defined in `/components` and `/layouts`.

---



🔷 Recommended Sidebar Structure
1. Dashboard

🔔 Alerts / Notifications

2. Inventory Management
📦 Items

🗂️ Categories

🏷️ Units of Measurement

🏪 Warehouses

🔄 Inventory Transfers

✏️ Inventory Adjustments

3. Procurement
📥 Purchase Orders

✅ Goods Received Notes (GRNs)

🧾 Purchase Invoices

💳 Debit Notes

👨‍💼 Vendors

4. Sales
🛒 Sales Orders

📤 Delivery Notes

📄 Sales Invoices

💸 Credit Notes

👩‍💼 Customers

5. Accounting
📚 Chart of Accounts

💰 Journal Entries

💹 Taxes

Tax Rates

Tax Groups

Item Tax Mapping

💱 Currency Management

🏢 Cost Centers

6. Reports 📑
Inventory Reports

Purchase Reports

Sales Reports

Tax Reports

Profit & Loss

Stock Valuation

Customer/Vendor Statements

7. Settings ⚙️
System Settings

User Management

Roles & Permissions

Company Info
