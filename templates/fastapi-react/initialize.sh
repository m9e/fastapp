#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    printf "${2}${1}${NC}\n"
}

# Check if Python 3.10 is installed
check_python() {
    if command -v python3.10 &>/dev/null; then
        print_color "Python 3.10 is installed" "$GREEN"
    else
        print_color "Python 3.10 is not installed. Please install it and try again." "$RED"
        exit 1
    fi
}

# Check if Node.js and npm are installed
check_node() {
    if command -v node &>/dev/null && command -v npm &>/dev/null; then
        print_color "Node.js and npm are installed" "$GREEN"
    else
        print_color "Node.js and npm are not installed. Installing via NVM..." "$YELLOW"
        install_nvm
    fi
}

# Install NVM and Node.js
install_nvm() {
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 21
    nvm use 21
    print_color "Node.js 21 has been installed" "$GREEN"
}

# Install Python dependencies
install_python_deps() {
    print_color "Installing Python dependencies..." "$YELLOW"
    if [ -f backend/pyproject.toml ]; then
        cd backend
        pip install poetry
        poetry install
        cd ..
    else
        print_color "pyproject.toml not found in the backend directory. Skipping Python dependency installation." "$RED"
    fi
    print_color "Python dependencies installed" "$GREEN"
}

# Install Node.js dependencies
install_node_deps() {
    print_color "Installing Node.js dependencies..." "$YELLOW"
    if [ -d frontend ] && [ -f frontend/package.json ]; then
        cd frontend
        npm install
        cd ..
    else
        print_color "frontend directory or package.json not found. Skipping Node.js dependency installation." "$RED"
    fi
    print_color "Node.js dependencies installed" "$GREEN"
}

# Initialize the database
init_database() {
    print_color "Initializing the database..." "$YELLOW"
    if [ -d backend ] && [ -f backend/alembic.ini ]; then
        cd backend
        alembic upgrade head
        cd ..
    else
        print_color "backend directory or alembic.ini not found. Skipping database initialization." "$RED"
    fi
    print_color "Database initialized" "$GREEN"
}

# Main execution
main() {
    print_color "Starting initialization..." "$YELLOW"
    
    check_python
    check_node
    install_python_deps
    install_node_deps
    init_database

    if [ -d backend ] && [ ! -f backend/.env ]; then
        if [ -f backend/.env.example ]; then
            cp backend/.env.example backend/.env
            echo "backend/.env file created. Please update it with your specific settings."
        else
            print_color ".env.example file not found in the backend directory." "$RED"
        fi
    else
        echo "backend/.env file already exists or backend directory not found."
    fi    
    
    print_color "Initialization complete!" "$GREEN"
    print_color "To start the backend server, run: 'cd backend && uvicorn app.main:app --reload'" "$YELLOW"
    print_color "To start the frontend server, run: 'cd frontend && npm start'" "$YELLOW"
}

main