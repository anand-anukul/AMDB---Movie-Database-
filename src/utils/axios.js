import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWU0ZDM1NjJkOTlhZmViZTgxZTg1NzRlODI5MGE2ZCIsInN1YiI6IjY1ZDgzMWU0MzliNmMzMDE4NmQzYTA2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZmP-CCEgf1ZVnNcMaB7yzbhglo2Y2ENOlW9rjJmCqBw",
  },
});

export default instance
