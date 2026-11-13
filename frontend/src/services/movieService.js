
import api from "./api";

// Get all published movies
export const getMovies = async () => {
    const response = await api.get("/movies/");
    return response.data.movies;
};

// Get a single movie
export const getMovieById = async (id) => {
    const response = await api.get(`/movies/${id}`);
    return response.data.movie;
};

// Add a movie
export const createMovie = async (movieData) => {
    const response = await api.post("/movies/", movieData);
    return response.data.movie;
};

// Update a movie
export const updateMovie = async (id, movieData) => {
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data.movie;
};

// Delete a movie
export const deleteMovie = async (id) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
};
