import express from "express";
import {
  getTrendingTvShow,
  getTvShowDetails,
  getTvShowTrailer,
  getSimilarTvShows,
  getTvShowsByCategory,
} from "../controllers/tvShow.controller.js";
const router = express.Router();

router.get("/trending", getTrendingTvShow);
router.get("/:id/trailer", getTvShowTrailer);
router.get("/:id/details", getTvShowDetails);
router.get("/:id/similar", getSimilarTvShows);
router.get("/:category", getTvShowsByCategory);

export default router;
