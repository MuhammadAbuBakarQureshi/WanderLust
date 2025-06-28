
# Wander Lust

Wander Lust is a full-stack web application inspired by Airbnb, designed to help users explore and book unique places to stay around the world. Built with the MERN stack, it includes features like listings, user authentication, and reviews.

---


## Features

- User Authentication (Register, Login, Logout)
- Create, Edit, Delete Listings
- Upload photos of listings
- Leave and view Reviews
- Responsive and modern UI

---

---

## Tech Stack

**Frontend:**
- HTML, CSS, JavaScript
- Bootstrap

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Cloudinary (for image uploads)

---

## Other Tools and Libraries

- **Cloudinary** – For image storage and delivery
- **Multer & multer-storage-cloudinary** – To handle file uploads and integrate with Cloudinary
- **Dotenv** – To manage environment variables securely
- **Connect-mongo** – To store session data in MongoDB
- **Express-session** – For managing user sessions
- **Connect-flash** – To display temporary flash messages (e.g., success or error notifications)
- **Method-override** – To enable HTTP verbs like PUT and DELETE via forms
- **EJS & EJS-mate** – For server-side rendering and layout support
- **Passport, passport-local, passport-local-mongoose** – For handling user authentication and password hashing
- **Joi** – For validating data, such as user input in forms

---

## How It Works

**1.** Users sign up or log in.

**2.** Explore listings and view their details.

**3.** Add listings with Title, image, description, price, country and location.

**4.** Leave reviews and view others' experiences.

---

## Lessons Learned

- Building RESTful routes with Express
- Managing user sessions and authentication with Passport
- Uploading and storing images with Cloudinary
- Validating and sanitizing user input with Joi
- Rendering dynamic content using EJS and layout templates

## Contact

Developed by Muhammad Abu Bakar Qureshi
GitHub: [MuhammadAbuBakarQureshi](https://github.com/MuhammadAbuBakarQureshi)
Email: qureshimuhammadabubakar@gmail.com


## Run Locally

### Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

```bash
git clone https://github.com/your-username/wander-lust.git
cd wander-lust
npm install
