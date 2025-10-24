# Full-Stack Shop Application

A complete Shop web application built with a decoupled frontend using **React** and a robust backend service powered by **Spring Boot**. The project demonstrates a full-stack architecture, from UI rendering to REST API communication and data persistence in database.

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) 
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Architecture Overview](#architecture-overview)
- [Backend Service Details](#backend-service-details)
- [Key Features](#key-features)
- [Screenshots](#screenshots)

## About the Project

This project is a full-stack "Shop App" designed to showcase a modern client-server architecture. The application is split into two main parts:

-   **`shop-react-frontend`**: A dynamic and responsive single-page application (SPA) built with React that provides the user interface. It handles all user interactions, from browsing products to managing the shopping cart.
-   **`shop-spring-backend`**: A powerful RESTful API built with Spring Boot. It manages all business logic, data persistence, product management, and exposes a set of endpoints for the frontend to consume.

The frontend communicates with the backend via HTTP requests, making the two parts of the application independent and scalable.

## Technologies Used

### Backend (`shop-spring-backend`)

-   **Framework**: [Spring Boot](https://spring.io/projects/spring-boot)
-   **Language**: Java
-   **API**: Spring Web (for RESTful services)
-   **Data Persistence**: Spring Data JPA & Hibernate
-   **Database**: [H2 In-Memory Database](https://www.h2database.com/) (for easy setup and development)
-   **Build Tool**: [Maven](https://maven.apache.org/)

### Frontend (`shop-react-frontend`)

-   **Framework**: [React](https://reactjs.org/)
-   **Language**: JavaScript
-   **Routing**: [React Router](https://reactrouter.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Styling**: [Bootstrap 5](https://getbootstrap.com/) & Custom CSS
-   **Build Tool**: [Vite](https://vitejs.dev/) / Create React App

## Architecture Overview

The application follows a classic client-server model, which is standard for modern web development.

<img src="https://github.com/jorgepiconjr/FullStack-Spring-React-ShopApp/blob/master/pictures/architecture.jpg?raw=true" alt="Architecture Overview" width="400" height="400"/>

## Backend Service Details

The `shop-spring-backend` project acts as a central service that exposes a REST API for managing products in database. Its responsibilities are clearly defined:

-   **Product Endpoint (`/api/product`)**:
    -   `GET /`: Fetches a list of all available products.
    -   `GET /{id}`: Fetches details for a single product.
    -   `POST /`: Creates a new product (including image upload).
    -   `PUT /{id}`: Updates an existing product.
    -   `DELETE /{id}`: Deletes a product.
-   **Data Management**: Handles all CRUD (Create, Read, Update, Delete) operations for products.

## Key Features

-   **Full Product Management**: Users can create, view, update, and delete products through the user interface.
-   **Detailed Product View**: A dedicated page to display all information for a single product, including name, description, brand, price, and availability.
-   **Dynamic Frontend**: The React application efficiently fetches and displays data, offering a smooth user experience.
-   **State Management**: Utilizes React Context API to manage global state like the shopping cart.
-   **Responsive Design**: The UI is fully responsive and works on desktop, tablet, and mobile devices thanks to Bootstrap.
-   **Conditional Rendering**: The UI dynamically changes based on product availability, such as disabling the "Add to Cart" button.

## Screenshots

Note: 
- If images are not available, refresh the page and wait a few seconds.
- Strange colors and effects are not real, they were produced from "ghosting" due to low GIF quality.

**Overview**

<img src="https://github.com/jorgepiconjr/FullStack-Spring-React-ShopApp/blob/master/pictures/overview.gif" alt="Architecture Overview" width="700" height="700"/>

**Create, Delete, Update Products**

<img src="https://github.com/jorgepiconjr/FullStack-Spring-React-ShopApp/blob/master/pictures/create-delete-update.gif" alt="cdu" width="700" height="700"/>

**Cart & Purchase**

<img src="https://github.com/jorgepiconjr/FullStack-Spring-React-ShopApp/blob/master/pictures/cart-purchase.gif" alt="cart" width="700" height="700"/>

