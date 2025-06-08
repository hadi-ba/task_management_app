# Full-Stack Task Management Application

This is a complete full-stack task management application, featuring a React frontend and a NestJS backend API. The entire environment is containerized using Docker and Docker Compose for easy setup and consistent deployment.

---

## Technology Stack

* **Frontend:** React, TypeScript, Vite, Axios, React Query, Tailwind CSS
* **Backend:** NestJS, TypeScript, Prisma ORM
* **Database:** MySQL
* **Containerization:** Docker, Docker Compose

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

---

## Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/hadi-ba/task_management_app.git
    ```

2.  **Create the Environment File**

    In the root directory of the project, create a file named `.env`. Copy the contents of the `.env.example` file (if one exists) or use the template below. This file will store your database credentials.

    **File: `/.env`**
    ```env
    # MySQL Credentials
    MYSQL_DATABASE=task_management_db
    MYSQL_USER=user
    MYSQL_PASSWORD=password
    MYSQL_ROOT_PASSWORD=password

    # NestJS Database URL
    # This uses the Docker service name 'db' as the host.
    DATABASE_URL="mysql://user:password@db:3306/task_management_db"
    ```

---

## Running the Application

Once the setup is complete, you can build and run all the services with a single command from the project root directory:

```bash
docker-compose up --build
```
```--build```: This flag tells Docker Compose to build the images from the Dockerfiles. You only need to add this the first time you run the command or after making changes to the code or Dockerfiles.

To run the containers in the background (detached mode), add the -d flag:
```
docker-compose up --build -d
```
The first time you run this command, it will take a few minutes to download the base images and install all the dependencies. Subsequent starts will be much faster.

The startup process is fully automated:

The database service will start and become healthy.

The API service will wait for the database, run database migrations, seed the initial data, and then start the server.

The frontend service will start, serving the React application.

Accessing the Services
Once all containers are running, you can access the application:

Frontend Application: Open your web browser and navigate to http://localhost:8080

Backend API: The API is accessible at http://localhost:3000

Database: To connect directly to the database from a client on your host machine (like DBeaver or TablePlus), use host localhost and port 3307.

Stopping the Application
To stop all the running containers, press Ctrl + C in the terminal where docker-compose is running.

If you are running in detached mode, use the following command:
```
docker-compose down
```
To stop the containers and also remove the database volume (deleting all data), use:
```
docker-compose down -v
```