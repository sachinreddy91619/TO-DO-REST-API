# Project Description:
This document provides information on how to use and test the Todo App REST-API using Postman.


# Project Folder Structure:

ToDoApp/

|--controllers/

   |-- authenCon.js
   |-- CrudOper.js

|-- middleware/
   |--authmiddle.js

|-- models/
   |-- Todo.js
   |-- User.js

|-- routes/
   |-- authRoutes.js
   |-- curdRoutes.js
   
|-- tests/
   |--todoRoutes.test.js
|-- .env

|-- app.js

|-- package.json

|-- README.md




## Project Set-UP:

Before using the API make sure to install all dependencies .

Node.js for runtime :
...> npm init -y {for node }

Install Express (web framework):
..> npm install express

To connect Node.js to MongoDB :
..> npm install mongoose

Install Jest for testing: 
..> npm install jest --save-dev

Dev Dependencies :
..> npm install nodemon --save-dev

Install dotenv to manage environment variables:
..> npm install dotenv

Install bcrypt for password hashing:
..> npm install bcrypt

Install jsonwebtoken for creating and verifying JWTs:
..> npm install jsonwebtoken

Install nodemon for auto-restarting the server :
..> npm install nodemon --save-dev


NOTE: Install the Postman in the system by which we cna test the API.

# Change the Scripts in PACKAGE.JSON:

"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "test": "jest"
}

# Server running:
..> use "npm run dev" commannd to run the Api, please ensure that the database connected .

# BASE URL:

..> Use this base URl when Testing in postman:
http://localhost:7788/api

# Authentication:

..> This API uses JWT (JSON Web Tokens) for authentication. You need to obtain a token by logging in after Registrations.

Note: The Token expires in one Hour make sure to use the token with in 1Hour for all CRUD operation, or else re logging to get the new Token.

# Token Generation :
..> Register a user using the /api/auth/register endpoint.
..> Log in using the /api/auth/login endpoint to get the JWT token.
..> Include the token in the Authorization header of subsequent requests as Bearer <your-token>.


## Authentication Endpoints :

# Register User:

URL:`http://localhost:7788/api/auth/register`

METHOD : `POST`

BODY (JSON):
json :


{
    "username":"krishna",
    "password":"krishna@123"
}

Then we get  if successfully registered:
{
    "message": "User registered successfully"
}

Then we get if not successfully registered:
{
    "error": "Internal Server Error"
}

# Login User :

URL: `http://localhost:7788/api/auth/login`

METHOD: `POST`

Body (JSON) :
{
    "username":"krishna",
    "password":"krishna@123"
}

..> If successfully logged in then we get:

{
    "token": <"token">
}

...> else we get Error

NOTE: Use Token for further operation

#  CREATE TO-DO FOR A REGISTRATION:


URl: `http://localhost:7788/api/todos`

METHOD: `POST`

.> Creates a new todo item. Requires authentication.

In Header:
key:Authorization
value:Bearer </token>

BODY (JSON) :

{
    "title":"Buy Equipments",
    "description":"Computer,  mouse, keyboard, head-phones",
    "state":"incomplete"
}

Then we response has:
{
    "title": "Buy Equipments",
    "description": "Computer,  mouse, keyboard, head-phones",
    "state": "incomplete",
    "userId": "67624958989150665708607f",
    "_id": "67624cb49891506657086082",
    "__v": 0
}

..> In same way add another To-Do-List

## Getting All The TO-DO'S FOR User:

URL:`http://localhost:7788/api/todos`

METHOD: GET

Fetches all todo items for the user.Requires authentication.


In Header:
key:Authorization
value:Bearer </token>

..> Then we Get Response has:

[
    {
        "_id": "67624cb49891506657086082",
        "title": "Buy Equipments",
        "description": "Computer,  mouse, keyboard, head-phones",
        "state": "incomplete",
        "userId": "67624958989150665708607f",
        "__v": 0
    },
    {
        "_id": "67624d1d9891506657086084",
        "title": "About school",
        "description": "teachers,playground,library",
        "state": "incomplete",
        "userId": "67624958989150665708607f",
        "__v": 0
    }
]

## Getting a TO-Do-List by ID:

URL: `http://localhost:7788/api/todos/67624d1d9891506657086084`

METHOD: GET

.> Fetches a single todo item by its ID. Requires authentication.

In Header:
key:Authorization
value:Bearer </token>

...>  Then we get the Response has:

{
    "_id": "67624d1d9891506657086084",
    "title": "About school",
    "description": "teachers,playground,library",
    "state": "incomplete",
    "userId": "67624958989150665708607f",
    "__v": 0
}


## Update a To-DO-List by id :

URL:`http://localhost:7788/api/todos/67624d1d9891506657086084`

METHOD: PUT

.> Updates a todo item. Requires authentication.


In Header:
key:Authorization
value:Bearer </token>

BODY:(JSON)

{
    "title":"About School",
    "state":"completed"
}


...> Then we get the Response has:

{
    "_id": "67624d1d9891506657086084",
    "title": "About School",
    "description": "teachers,playground,library",
    "state": "completed",
    "userId": "67624958989150665708607f",
    "__v": 0
}


## Deleting the To-Do-List:

URL:`http://localhost:7788/api/todos/67624d1d9891506657086084`

METHOD: DELETE

.> Deletes a todo item. Requires authentication.

In Header:
key:Authorization
value:Bearer </token>

...> Then we get the Response has:

{
    "message": "To-do deleted successfully"
}


## ERROR HANDLING:

Error Handling
The API will respond with appropriate error messages and HTTP status codes.

Example:

400: Bad request (e.g., missing required fields)
401: Unauthorized (e.g., no token provided or invalid token)
403: Forbidden (e.g., trying to access or modify someone else's data)
404: Not found (e.g., todo item not found)
500: Internal Server Error
