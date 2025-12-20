Secure Voting Application Backend

This is a backend-only Voting Application built using Node.js.
It allows voters to vote securely, candidates to view their results, and admins to audit who voted to whom.

The project focuses on authentication, authorization, and vote integrity, not just basic CRUD.

 What This Application Does
> Voters

Register and login

View available candidates

Vote only once

> Candidates

Register and login

View only their own vote count

> Admin

Login securely

View who voted to whom (audit purpose only)

> Tech Stack

Tech Stack: Node.js, Express.js, SQLite, bcrypt, JWT, REST API

🗂️ Database Design
> voters

Stores voter details and voting status.

voter_id

name

email

password (hashed)

has_voted

> candidates

Stores candidate details and vote count.

candidate_id

name

email

party

password (hashed)

votes

> votes

Maps who voted to whom.

vote_id

voter_id (UNIQUE – ensures one vote per voter)

candidate_id

> admins

Stores admin credentials.

admin_id

username

password (hashed)

> Authentication & Authorization

Uses JWT (JSON Web Tokens)

Token is sent in every protected request as:

Authorization: Bearer <TOKEN>


Role-based access:

voter

candidate

admin

> How Voting Works (Simple Explanation)

Voter logs in and gets a JWT token

Voter selects a candidate and votes

The vote is saved in the votes table

The candidate’s vote count increases

The voter cannot vote again

 One vote per voter is enforced
 Database also prevents duplicate votes

>> API Endpoints
> Voter APIs
Method	Endpoint	Description
POST	/auth/register	Register voter
POST	/auth/login	Login voter
GET	/candidates	View candidates
POST	/vote/:candidateId	Cast vote
> Candidate APIs
Method	Endpoint	Description
POST	/candidates/register	Register candidate
POST	/candidates/login	Login candidate
GET	/candidates/me/votes	View own votes
> Admin APIs
Method	Endpoint	Description
POST	/admin/login	Admin login
GET	/admin/votes	View who voted to whom
>> How to Run the Project
> Install dependencies
npm install

> Create .env file
JWT_SECRET=voting_secret_key

>> How to Run the Project
> Install dependencies
npm install

> Create .env file
JWT_SECRET=voting_secret_key

> Start server
node server.js


Server will run at:

http://localhost:3000

> API Testing

Tested using Postman or VS Code REST Client (.http file)

JWT token must be included for protected routes
