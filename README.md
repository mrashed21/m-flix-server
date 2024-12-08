# Movie API - CRUD Server

This is a Node.js-based API for managing movies in a MongoDB database. It supports basic CRUD operations for movies, including adding, updating, deleting, and retrieving movies. The API also includes functionality for managing a user's favorite movies.

## Features

- **GET /movie/all**: Retrieve all movies from the database.
- **GET /movie/recent**: Get the 5 most recently added movies.
- **GET /movie/details/:id**: Retrieve details of a specific movie by its ID.
- **GET /movie/featured**: Retrieve the top 6 featured movies based on rating.
- **POST /movie**: Add a new movie to the database.
- **DELETE /movie/details/:id**: Delete a movie by its ID.
- **PUT /movie/update/:id**: Update movie details by its ID.
- **POST /movie/favorites/:email**: Add a movie to the user's favorite list.
- **DELETE /movie/favorites/:email/:movieId**: Remove a movie from the user's favorite list.
- **GET /movie/favorites/:email**: Retrieve the user's favorite movies.

## Technologies Used

- **Node.js**: Backend JavaScript runtime environment.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing movie data.
- **MongoDB Atlas**: Cloud-hosted MongoDB service.
- **CORS**: Middleware for enabling cross-origin resource sharing.
- **dotenv**: To manage environment variables securely.
