# CampusLink X Frontend

Live Application: https://campuslink-x.vercel.app

CampusLink X is a comprehensive academic collaboration and career development platform designed to connect students, lecturers, and administrators within a unified digital ecosystem. The platform streamlines academic communication, resource sharing, collaborative learning, portfolio building, and career opportunity discovery through an intuitive and modern user experience.

This repository contains the frontend application developed using Next.js, TypeScript, and Tailwind CSS.

## Key Features

### Authentication and Authorization

Secure JWT-based authentication system with role-based access control for Students, Lecturers, and Administrators. Includes protected routes and persistent user sessions.

### Course Management

Browse available courses, enroll in courses, access learning resources, and manage academic content through a structured course management system.

### AI Study Assistant

Upload notes or PDF documents to generate AI-powered summaries, key concepts, and revision notes, helping students improve learning efficiency.

### Real-Time Study Rooms

Participate in course-specific discussion rooms powered by Socket.IO, enabling instant communication and collaborative learning.

### Opportunities Portal

Discover internships, hackathons, placements, and other career opportunities posted by lecturers and administrators.

### Student Portfolio System

Create professional public portfolios showcasing skills, projects, GitHub profiles, LinkedIn profiles, resumes, and personal achievements.

### Profile Management

Manage personal information, customize profile details, and upload profile pictures.

## Technology Stack

Frontend Framework: Next.js 16

Programming Language: TypeScript

UI Library: React

Styling: Tailwind CSS

HTTP Client: Axios

Real-Time Communication: Socket.IO Client

Notifications: React Toastify

## Project Structure

src/
├── app/
├── components/
├── context/
├── services/
├── lib/
├── hooks/
└── types/

## Installation and Setup

Clone the repository:

git clone <frontend-repository-url>

Install dependencies:

npm install

Create a .env.local file:

NEXT_PUBLIC_API_URL=http://localhost:5000

Start the development server:

npm run dev

Build the application:

npm run build

Run the production build:

npm start

## Deployment

The frontend application is deployed on Vercel and communicates with the CampusLink X backend through REST APIs and Socket.IO connections.

## Application Preview

### Landing Page

<img width="1918" height="908" alt="Landing Page" src="https://github.com/user-attachments/assets/99a002df-5845-4aea-9b7b-861fe94e82cf" />

### Courses Dashboard

<img width="1918" height="906" alt="Courses Dashboard" src="https://github.com/user-attachments/assets/0cc1787e-3df3-4c02-82ef-261d13203634" />

### AI Study Assistant

<img width="1918" height="903" alt="AI Study Assistant" src="https://github.com/user-attachments/assets/cf1b4394-3016-406c-bcd5-cdfeb8b61558" />

### Real-Time Study Rooms

<img width="1918" height="903" alt="Study Rooms" src="https://github.com/user-attachments/assets/e57c8582-d01f-4202-b822-d350c39d46c9" />

### Opportunities Portal

<img width="1918" height="906" alt="Opportunities Portal" src="https://github.com/user-attachments/assets/e480f578-ed9b-44f1-ae91-9c8601edef49" />

### Student Portfolio

<img width="1918" height="907" alt="Student Portfolio" src="https://github.com/user-attachments/assets/dd632e27-e1d4-4ccd-8d96-1a0525dfc414" />

## Author

Hemant Singh Kanwal

CampusLink X was developed as a full-stack academic collaboration platform with the goal of enhancing learning, communication, professional development, and career growth within educational institutions.
