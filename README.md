# Form Capture App
A full-stack application that captures form submissions from the frontend and stores them in a MySQL database using Sequelize ORM and REST APIs, added  CRUD operations logic with queryparameters.


# Features
- Simple frontend to capture user data
- REST API built with Node.js and Express.js
- Sequelize ORM for database operations
- MySQL as the database
- Validation for inputs
- Validation for API query parameters

#INSTALLATION AND SETUP
Backend:
npm init  
npm install
express
sequelize & mysql2 → ORM + MySQL driver
dotenv → Environment variables
multer → File uploads
cors → Cross-origin requests
axios → HTTP client
nodemon (dev) → Auto-restart server during development





#Tech Stack:

Backend: Node.js, Express.js
ORM: Sequelize
Database: MySQL
Frontend: Reactjs

#START SERVER: npm run server




Database Tables:
Users
Leads
Tasks


USERS TABLE
API Endpoints
GET /users — Get all users
POST /users — Add new user
GET /users/:id — Get single user by ID
PATCH /users/:id — Update user by ID



LEADS TABLE:
API Endpoints
GET /leads — Get all leads
POST /leads — Add new lead
GET /leads/:id — Get single lead by ID
PATCH /leads/:id — Update lead by ID
GET /leads/owner/:owner_id — Get leads by owner ID (foreign key)
DELETE /leads/:id — Delete lead by ID

TASKS TABLE:
API Endpoints
GET /tasks — Get all tasks
POST /tasks — Add new task
GET /tasks/:id — Get single task by ID
PATCH /tasks/:id — Update task by ID
GET /tasks/lead/:lead_id — Get tasks by lead ID (foreign key)
DELETE /tasks/:id — Delete task by ID


QUERY PARAMETERS:   
For Get All Methods:
page — Page number for pagination
pageSize — Number of results per page
sort — Field to sort by
order — Sort direction (asc or desc)
fields — Comma-separated list of fields to return

   For Update Methods:
return —
full — Return full updated object eg:  {return=full}
minimal — Return minimal confirmation data  eg: {return = minimal}
For Delete Methods:
confirmation — Confirmation flag for deletion   eg: {confirmation = true}
force — Force delete without soft-delete safeguards eg: {force = true/ false}

