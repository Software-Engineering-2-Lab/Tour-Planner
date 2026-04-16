# Tour Planner - Software Engineering 2

A professional tour management system built with a modern layered architecture, focusing on scalability and containerization.

## Architecture & Tech Stack

This project follows a **Layered Architecture** pattern, ensuring a clean separation between data access, business logic, and the presentation layer.

* **Backend:** Java 25 / Spring Boot 3.x
    * **Persistence:** Hibernate (JPA) with PostgreSQL.
    * **Pattern:** Layered (Controllers -> Services -> Repositories -> Models).
* **Frontend:** Angular 19+
    * **Pattern:** MVVM (Model-View-ViewModel).
* **Infrastructure:** Docker & Docker Compose for seamless environment orchestration.

## Project Structure

```text
.
├── TourPlanner/                # Entire Source Code of the application
│   ├── backend/                # Spring Boot Application
│   │   └── src/main/java/      # Layered Java source code 
│   ├── frontend/               # Angular Application (UI/UX)
|   └── docker-compose.yml      # Container orchestration for App & DB
├── Protocol/                   # Project documentation and UML diagrams
└── README.md                   

```

## How to Run

Since the project is fully dockerized, you only need Docker Desktop installed to start the entire ecosystem.

1. Clone the repository:
git clone https://github.com/Software-Engineering-2-Lab/Tour-Planner

2. Start the containers:
Navigate to the /TourPlanner directory and run:
```bash
docker-compose up --build
```

3. Access Points:
- Frontend UI: http://localhost:4200
- Backend API: http://localhost:8080
- Database: Port 5432

For testing the application go directly to http://localhost:4200.

## Team members:
* Anghel Mihai-Alexandru
* Resitca Daniel
* Veress Armand