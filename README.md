# Web API Auth
## Part of Hacktiv8 Portofolio

### Introduction
This program demonstrate a simple user authorization system using token to perform basic CRUD task. This program has no view and API only

#### For First Use
1. Install MongoDB and npm install
2. Configure your database in app.js
3. Modify userControllers on signup block to create admin

#### API Method
| URL | Method | Usage | Response |
|:---:|:---:|:--- |:---|
|/ | GET | Enter token in headers with attribute "token" to log in|Return welcome message if not logged in yet and list all user if logged in|
|/signup | POST | Enter user data with username, email and password as attributes | Return created user data if success |
|/login | POST | Enter username and password as attributes in body | Return token if success |
|/:id | DELETE | Enter user or admin token to header with "token" attribute | Return success message with deleted user id if success |
|/:id | PATCH | By default, enter new email with "email" attribute | Return success message if success |
