# Feedbacker - Feedback Management & Analytics Dashboard

Feedbacker is a comprehensive Feedback Management System designed to streamline the process of collecting, managing, and analyzing user feedback. The application allows users to submit feedback, while admins can view, analyze, and manage feedback entries. The system is built with a robust backend and a modern, responsive frontend, ensuring a seamless user experience.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express** framework
- **MySQL** (using Prisma ORM) for user data storage
- **MongoDB** (using Mongoose ORM) for feedback data storage
- **JWT** for authentication and role-based access control
- **Zod** for runtime validation
- **Vitest** for unit testing
- **Swagger** for API documentation

### Frontend
- **React** with **Vite** and **TypeScript**
- **Redux** (Zustand) for state management
- **TailwindCSS** for responsive and modern UI
- **React Query** for API calls
- **Vitest** for unit testing

---

## 🚀 Features

### Backend
1. **User Management**
   - Register users with roles (Admin/User).
   - Authenticate users using JWT.
2. **Feedback Management**
   - Users can submit feedback.
   - Admins can view all feedback entries.
   - Users can view their own feedback.
3. **Analytics**
   - Admins can view aggregated analytics (e.g., total feedback, top active users).
4. **Validations**
   - Zod for runtime validation of API payloads.
   - Feedback messages must have a minimum length of 10 characters.
5. **Error Handling**
   - Global error middleware for clean API responses.
6. **Testing**
   - Unit testing for API routes and services using Vitest.
7. **Documentation**
   - Swagger for API documentation.

### Frontend
1. **Authentication**
   - Login and registration pages with role selection (Admin/User).
2. **User Dashboard**
   - Submit feedback via a form.
   - View a list of submitted feedback as cards.
3. **Admin Dashboard**
   - View all feedback entries from users.
   - Analytics dashboard with draggable and resizable widgets.
4. **Analytics Widgets**
   - **Total Feedbacks Submitted**: Shows the count of all feedback.
   - **Top 3 Active Users**: Displays users who submitted the most feedback.
5. **UI/UX**
   - Responsive design using TailwindCSS.
6. **Testing**
   - Unit testing for React components using Vitest.
7. **State Management**
   - Zustand for global state management.
8. **Reusable Components**
   - Buttons, forms, cards, and other reusable UI components.

---
## 🛠️ Setup Instructions

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/feedbacker.git
   cd feedbacker/server

2. Install Dependencies:
    ```bash
    npm install

3. Set up environment variables:
    - Create a .env file in the server directory.
    - Add the following variables:
     ```bash
     DATABASE_URL=mysql://user:password@localhost:3306/feedbacker
    MONGODB_URI=mongodb://localhost:27017/feedbacker
    JWT_SECRET=your_jwt_secret
    PORT=3000

4. Run database migrations (Prisma):
    ```bash
    npx prisma migrate dev
5. Start the server:   
    ```bash
    npm run dev
5. Access Swagger documentation:
    - Visit http://localhost:3000/api-docs in your browser.

### Frontend
1. Navigate to the frontend directory:

    ```bash
    cd ../client

2. Install Dependencies:
    ```bash
    npm install
3. Start the server:   
    ```bash
    npm run dev
4. Access the application:
    - Visit http://localhost:5173 in your browser.


## 📄 API Documentation
API documentation is available via Swagger. After starting the backend server, visit
    ``` http://localhost:3000/api-docs

