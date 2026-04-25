import { fetchFromTMDB } from "../services/tmdb.service.js";
import { urlsList } from "../urls/urls.tmdb.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(urlsList.trendingMovies);
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, movie: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getMovieTrailer(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    );
    res.send({ sucess: true, trailer: data });
  } catch (error) {
    if (error.response || error.response.status === 404) {
      res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    );
    res.status(200).json({ sucess: true, details: data });
  } catch (error) {
    if (error.response || error.response.status === 404) {
      res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
