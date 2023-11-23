#!/bin/bash

# Navigate to the backend directory
cd backend || exit

# Create a virtual environment (optional but recommended)
python -m venv venv || { echo "Failed to create virtual environment"; exit 1; }

# Activate the virtual environment
source venv/Scripts/activate || { echo "Failed to activate virtual environment"; exit 1; }

# Install backend dependencies
pip install -r requirements.txt

# Move back to the parent directory
cd ..

# Navigate to the frontend directory
cd frontend || exit

# Install frontend dependencies
npm install
