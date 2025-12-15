# Self-Storage Management System - Requirements

## Overview
A production-ready self-storage unit management system focused on core rental operations with enterprise-grade infrastructure including MongoDB persistence, Redux state management, and CI/CD automation.

---

## User Stories

### US-1: Unit Inventory Management
**As a** facility manager  
**I want to** view and manage storage units of different sizes  
**So that** I can track available inventory and pricing

#### Acceptance Criteria (EARS Notation)

- **WHEN** the system initializes **THE SYSTEM SHALL** display a list of all storage units with their size category, unit number, and current status (occupied/vacant)

- **WHEN** a user views the unit inventory **THE SYSTEM SHALL** group units by size category (Small, Medium, Large) with corresponding dimensions and monthly rates

- **WHEN** a user filters by unit size **THE SYSTEM SHALL** display only units matching the selected size category

- **WHEN** a user filters by availability status **THE SYSTEM SHALL** display only units matching the selected status (occupied/vacant/all)

---

### US-2: Occupation Logging
**As a** facility manager  
**I want to** log when units become occupied or vacated  
**So that** I can maintain accurate occupancy records and rental history

#### Acceptance Criteria (EARS Notation)

- **WHEN** a user marks a unit as occupied **THE SYSTEM SHALL** prompt for tenant name, contact email, phone number, and move-in date

- **WHEN** a unit is marked as occupied **THE SYSTEM SHALL** record the occupation event with timestamp, tenant details, and monthly rate at time of rental

- **WHEN** a user marks a unit as vacated **THE SYSTEM SHALL** record the move-out date and calculate the total rental period

- **WHEN** viewing a unit's history **THE SYSTEM SHALL** display a chronological log of all occupation events including tenant names, dates, and duration

- **WHILE** a unit is occupied **THE SYSTEM SHALL** display the current tenant's name and move-in date on the unit card

---

### US-3: Late/Unpaid Account Tracking
**As a** facility manager  
**I want to** view a list of accounts with overdue payments for the current month  
**So that** I can follow up on collections and manage delinquent accounts

#### Acceptance Criteria (EARS Notation)

- **WHEN** a user navigates to the "Late Accounts" view **THE SYSTEM SHALL** display all occupied units with payments overdue for the current billing cycle

- **WHEN** displaying late accounts **THE SYSTEM SHALL** show tenant name, unit number, amount due, days overdue, and contact information

- **WHEN** a user marks a payment as received **THE SYSTEM SHALL** update the account status and record the payment date

- **WHEN** a payment is overdue by more than 30 days **THE SYSTEM SHALL** visually highlight the account as "Critical"

- **WHEN** filtering late accounts **THE SYSTEM SHALL** allow filtering by days overdue ranges (1-15, 16-30, 30+)

---

### US-4: Dashboard Overview
**As a** facility manager  
**I want to** see a summary dashboard of facility status  
**So that** I can quickly assess operations at a glance

#### Acceptance Criteria (EARS Notation)

- **WHEN** the dashboard loads **THE SYSTEM SHALL** display total units, occupied units, vacant units, and occupancy percentage

- **WHEN** the dashboard loads **THE SYSTEM SHALL** display total late accounts count and total outstanding balance

- **WHEN** the dashboard loads **THE SYSTEM SHALL** display revenue metrics for the current month (collected, pending, overdue)

- **WHEN** clicking a dashboard metric **THE SYSTEM SHALL** navigate to the relevant detailed view

---

## Non-Functional Requirements

### NFR-1: Performance
- **THE SYSTEM SHALL** load the initial dashboard within 2 seconds on standard broadband connection
- **THE SYSTEM SHALL** handle a facility with up to 500 storage units without degradation
- **THE SYSTEM SHALL** persist state changes to MongoDB within 500ms

### NFR-2: Reliability
- **THE SYSTEM SHALL** gracefully handle MongoDB connection failures with appropriate error messaging
- **THE SYSTEM SHALL** implement optimistic updates with rollback on API failure
- **THE SYSTEM SHALL** maintain Redux state consistency across all views

### NFR-3: Security
- **THE SYSTEM SHALL** sanitize all user inputs before database operations
- **THE SYSTEM SHALL** implement environment-based configuration for sensitive credentials
- **THE SYSTEM SHALL** use HTTPS for all API communications in production

### NFR-4: DevOps
- **THE SYSTEM SHALL** include automated tests with minimum 80% code coverage
- **THE SYSTEM SHALL** deploy automatically on merge to main branch via GitHub Actions
- **THE SYSTEM SHALL** include health check endpoints for monitoring
- **THE SYSTEM SHALL** support containerized deployment via Docker
