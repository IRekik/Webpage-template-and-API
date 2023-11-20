# Task Management App

**Description:**

This project is a simple task management application with a Flask backend server and a React.js frontend. It allows users to create, edit, and delete tasks.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Create tasks with a title, description, and deadline.
- View a list of tasks.
- Edit existing tasks.
- Delete tasks.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Python 3.x
- Flask
- Node.js (for the frontend)

### Installation

1. **Clone the repository:**

  ```bash
  git clone https://github.com/IRekik/task-management-app.git
  cd task-management-app
  ```
2. Set up the backend:

  ```bash
  # Navigate to the backend directory
  cd backend
  
  # Create a virtual environment (optional but recommended)
  python -m venv venv
  
  # Activate the virtual environment
  source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
  
  # Install backend dependencies
  pip install -r requirements.txt
  ```
3. Set up the frontend:

  ```bash
  Copy code
  # Navigate to the frontend directory
  cd frontend
  
  # Install frontend dependencies
  npm install
  ```
## Usage
1. Run the backend server:

  ```bash
  # Inside the backend directory
  python run.py
  ```
  The backend will run on http://localhost:5000.

2. Run the frontend development server:

  ```bash
  Copy code
  # Inside the frontend directory
  npm run server
  ```
  The frontend will be accessible at http://localhost:8080.

## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a new pull request.
