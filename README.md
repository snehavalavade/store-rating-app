# Store Rating Platform

## Tech Stack

- Next.js
- Prisma
- MySQL
- JWT Authentication
- CSS Modules

## Features

- User Signup/Login
- Store Listing
- Store Search
- Submit Ratings
- Update Ratings
- Average Store Ratings
- Admin Dashboard
- Store Owner Dashboard
- Password Update
- User Sorting

## Setup Instructions

1. Clone repository

2. Install dependencies

npm install

3. Configure .env

DATABASE_URL="mysql://root:password@localhost:3306/store_rating"

JWT_SECRET="mysecretkey"

4. Run Prisma Migration

npx prisma migrate dev --name init

5. Start project

npm run dev
