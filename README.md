# Mini Contact App – MySQL with Docker CLI

A simple contact application demonstrating **MySQL database deployment and management using Docker CLI and MySQL CLI**. The web interface was created with the assistance of AI.

## Technologies

* Docker
* MySQL
* MySQL CLI
* SQL
* Node.js
* HTML/CSS/JavaScript
* AI-assisted web interface

## Workflow

```text
AI-Generated Web Interface
          ↓
     Node.js Server
          ↓
    MySQL Connection
          ↓
    Docker Container
       (mysqldb)
          ↓
   mini_contact_app
          ↓
      contacts
        Table
```

## Docker Setup

Create the MySQL container:

```bash
docker run -d \
  --name mysqldb \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=mini_contact_app \
  -p 3307:3306 \
  mysql
```

### Execute Database Schema

Execute the schema manually:

```bash
docker exec -i mysqldb mysql -u root -proot mini_contact_app < schema.sql
```

Check the container:

```bash
docker ps
```

Access MySQL through CLI:

```bash
docker exec -it mysqldb mysql -u root -p
```

Inside MySQL:

```sql
SHOW DATABASES;
USE mini_contact_app;
SHOW TABLES;
DESC contacts;
SELECT * FROM contacts;
```

## Project Focus

The main focus is **containerizing MySQL with Docker and managing the database through CLI commands**, including database creation, table management, schema verification, and data retrieval.
