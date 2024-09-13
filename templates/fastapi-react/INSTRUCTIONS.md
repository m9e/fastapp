# FastAPI-React Template Setup Instructions

This document provides step-by-step instructions for setting up and customizing the FastAPI-React template project. Follow these instructions carefully to ensure a smooth setup process.

## Prerequisites

- Python 3.10
- Docker and Docker Compose
- Git (for version control)
- NVM (Node Version Manager)

## Project Structure

```
project-root/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── db/
│   │   └── modules/
│   │       └── widgets/
│   ├── alembic/
│   └── tests/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── node_modules/
│   ├── package.json
│   └── tests/
├── docker-compose.yml
├── requirements.txt
├── initialize.sh
└── INSTRUCTIONS.md
```

## Setup Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Review project dependencies:**
   Before proceeding, carefully review the following files:
   - `requirements.txt` for Python dependencies
   - `frontend/package.json` for Node.js dependencies
   Note any specific versions or requirements that may impact your development environment.

3. **Create and activate a virtual environment:**
   ```bash
   python3.10 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

4. **Install Python prerequisites:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Install NVM (Node Version Manager):**
   Follow the instructions at https://github.com/nvm-sh/nvm#installing-and-updating

6. **Install Node.js 21 and npm:**
   ```bash
   nvm install 21
   nvm use 21
   ```

7. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

8. **Set up the database:**
   ```bash
   cd backend
   alembic upgrade head
   cd ..
   ```

9. **Check for available ports:**
   Run the `test-ports.py` script to ensure the required ports are available:
   ```bash
   python test-ports.py 3000 3001 8000
   ```
   If any ports are occupied, modify the `docker-compose.yml` file to use available ports.

10. **Start the application:**
    - For development:
      ```bash
      # Start the backend
      cd backend
      uvicorn app.main:app --reload

      # In a new terminal, start the frontend
      cd frontend
      npm start
      ```
    - Using Docker:
      ```bash
      docker-compose up -d
      ```

## Customizing the Template

To adapt this template for your own project:

1. Rename "widgets" to your own entity names in both backend and frontend.
2. Update models, schemas, and API endpoints in the backend (`backend/app/modules/`).
3. Update components, pages, and API calls in the frontend (`frontend/src/features/`).
4. Modify the navigation components to reflect your new structure (`frontend/src/components/Layout/`).
5. Update the `docker-compose.yml` file if necessary, paying attention to:
   - Service names
   - Port mappings
   - Environment variables
   - Volume mounts

## Additional Notes

- This template uses SQLite by default. For production, consider using a more robust database like PostgreSQL.
- Remember to update the `.env` file with your specific settings before deploying.
- Add authentication and authorization as needed for your application.
- The `initialize.sh` script at the root of the project can be used to automate much of the setup process.

## Key Files and Directories

- Backend:
  - `backend/app/main.py`: Main application entry point
  - `backend/app/core/config.py`: Configuration settings
  - `backend/app/db/session.py`: Database session management
  - `backend/app/modules/widgets/`: Widget-related models, schemas, and API routes

- Frontend:
  - `frontend/src/App.tsx`: Main application component
  - `frontend/src/features/widgets/`: Widget-related components and API calls
  - `frontend/src/components/Layout/`: Layout components (TopNav, SubNav, LeftNav)

By following these instructions and customization guidelines, you should be able to set up and adapt the FastAPI-React template for your specific project needs.