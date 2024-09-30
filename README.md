# GOFoods

GOFoods is an agri-tech solution providing a platform for users to buy and sell products online. The platform allows users to register as customers or service providers, make new product listings, browse products, add them to their cart, and make purchases efficiently.

## Live Demo

You can view the live application here: [GOFoods Web App](https://gofoods-six.vercel.app/)

<!-- ## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [File Uploads](#file-uploads)
- [Database Seeding](#database-seeding)
- [Testing](#testing)
- [License](#license) -->

## Features

- **User Authentication**: Register and login with email and password. Supports Google ReCAPTCHA for enhanced security.
- **User Types**: 
  - *Customers*: Can browse products, add to cart, and make purchases.
  - *Service Providers*: Can upload their own products for sale.
  - *Admins*: Manage the platform and users.
- **Product Categories**: Browse products by category (e.g., vegetables, fruits, grains, etc.).
- **Cart System**: Add items to the cart, view, update quantities, and remove items.
- **Profile Management**: Users can update their profile and upload profile pictures.
- **Product Management**: Service providers can add, update, and remove their products with detailed information and images.
<!-- - **Theme Selection**: Users can choose between light and dark mode themes. -->

## Technologies Used

- **Frontend**: 
  - [React](https://reactjs.org/)
  - [Context API](https://reactjs.org/docs/context.html)
  - [Tailwind CSS](https://tailwindui.com/) & [Material-UI](https://material-ui.com/) for the user interface
  - [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

- **Backend**: 
  - [Django](https://www.djangoproject.com/)
  - [Django REST Framework](https://www.django-rest-framework.org/) for building the API
  - [PostgreSQL](https://www.postgresql.org/) for the database

- **Authentication**: 
  - Custom user model using email as username
  - Google ReCAPTCHA for bot prevention
  - JWT tokens for authentication
  - Django's built-in authentication system

- **File Uploads**:
	-  Django File Upload
	-  [AWS S3](https://aws.amazon.com/s3/) for file storage
	-  [Cloudinary](https://cloudinary.com/) for image storage and management

## Installation

### Prerequisites

- Node.js (for React)
- Python 3.8+ (for Django)
- PostgreSQL

### Setup
  ```bash
  git clone https://github.com/Gad-Ongoro/lisha.git
