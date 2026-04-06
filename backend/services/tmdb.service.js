import axios from "axios";


export const fetchMovies = async (url) => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer" + ENV_VARS.TMDB_API_KEY,
    },
  };

  const response = await axios(url, options);

  return response.data;
};