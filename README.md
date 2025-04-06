# Thomson Reuters Test

> **Note:** The applications were developed on node 20.15.1

This repository contains two projects:

- **Node**: The backend project that connects to an exposed AWS database.
- **example-tr**: The frontend project in React.

## Project 1: Node (Backend)

This repository includes the backend project that connects to an exposed AWS database.

### Installation and Setup Instructions

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/rockerix/test_ts.git
   ```

2. Navigate into the project folder:
   ```bash
   cd Node
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Run the backend:
   ```bash
   node index.js
   ```

---

## Project 2: example-tr (Frontend)

This repository contains the frontend project built with React.

### Installation and Setup Instructions

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/rockerix/test_ts.git
   ```

2. Navigate into the project folder:
   ```bash
   cd example-tr
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

---

## User Login Details

The following users can log in:

| Account ID | PIN  | Bank | Full Name              |
|------------|------|------|------------------------|
| 1          | 1234 | 1    | Robert Downey Jr.       |
| 2          | 5678 | 2    | Chris Evans            |
| 3          | 4321 | 3    | Chris Hemsworth        |
| 4          | 8765 | 4    | Mark Ruffalo           |
| 5          | 5555 | 5    | Scarlett Johansson     |
| 6          | 2222 | 6    | Samuel L. Jackson      |

---
## Recommendations For Use

In case the images are displayed on the ATM screen, it is recommended to reduce the zoom to 80 or 75%.

---

## Known Issues

If you encounter frontend errors, they may be caused by database connectivity issues. Restarting the backend usually resolves these problems. The database is hosted on a public AWS instance, so data iteration is not always optimal and may lead to delays.

---

## Author

Erick Flores Esquivel
