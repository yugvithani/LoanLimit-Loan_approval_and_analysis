# LoanLimit - Loan Approval & Repayment Risk Analysis

**LoanLimit** is a web-based platform designed for a bank to analyze loan repayment risks and make data-driven loan approval decisions. The application features two main roles: **Admin** and **Manager**.

## 🔍 Project Overview

The project is split into two major interfaces:

### 👨‍💼 Admin Section
- Manages bank managers using full CRUD (Create, Read, Update, Delete) operations.
- Provides access control and organizational oversight.

### 🧑‍💼 Manager Section
Consists of the following pages:
- **Home**: Overview and quick actions.
- **Risk Analysis**:
  - Manager inputs loan application details and uploads the applicant’s recent yearly transaction file.
  - System analyzes and outputs:
    - Risk percentage of loan repayment failure.
    - Average monthly income and spending.
    - Monthly income & spending chart.
- **Approval Stage**:
  - Based on input and historical loan data, the system provides a probability (% chance) for loan approval/rejection aligned with the bank's rules.
  - Manager makes the final decision to approve or reject the application.
- **Profile**: Manager's profile and account settings.
- **History**: View past loan application decisions made by the manager.

## ⚙️ Tech Stack

- **Frontend**: React.js
- **Backend**: Spring Boot (Java)
- **ML Integration**: Flask (Python) APIs for model-based decision making
- **Database**: MySQL (Aiven)

## 🚀 Live Demo

[🔗 Live Project Link](https://loanlimit.vercel.app)  

## 📦 Installation

### Prerequisites
Ensure you have the following installed:
- Node.js and npm
- Java (for Spring Boot)
- Python 3 (for Flask API)
- Git
