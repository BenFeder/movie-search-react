import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = "7f92ef68";

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullPlot, setShowFullPlot] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = response.data;
        if (data.Response === "True") {
          setMovieDetails(data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details">
        <div className="loading">Loading movie details...</div>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="movie-details">
        <div className="no-results">Movie details not found</div>
      </div>
    );
  }

  const shortPlot =
    movieDetails.Plot.length > 150
      ? movieDetails.Plot.substring(0, 150) + "..."
      : movieDetails.Plot;

  return (
    <div className="movie-details">
      <button
        className="movie-details__back-button"
        onClick={() => navigate("/")}
      >
        ← Go Back
      </button>

      <div className="movie-details__content">
        <div className="movie-details__poster-container">
          <img
            src={
              movieDetails.Poster !== "N/A"
                ? movieDetails.Poster
                : "./assets/walk-of-fame.jpg"
            }
            alt={movieDetails.Title}
            className="movie-details__poster"
          />
        </div>

        <div className="movie-details__info">
          <h1 className="movie-details__title">{movieDetails.Title}</h1>
          <div className="movie-details__meta">
            <span className="movie-details__year">{movieDetails.Year}</span>
            <span className="movie-details__rating">{movieDetails.Rated}</span>
            <span className="movie-details__runtime">
              {movieDetails.Runtime}
            </span>
          </div>

          <div className="movie-details__additional">
            <p>
              <strong>Genre:</strong> {movieDetails.Genre}
            </p>
            <p>
              <strong>Director:</strong> {movieDetails.Director}
            </p>
            <p>
              <strong>Actors:</strong> {movieDetails.Actors}
            </p>
            {movieDetails.imdbRating !== "N/A" && (
              <p>
                <strong>IMDb Rating:</strong> {movieDetails.imdbRating}/10
              </p>
            )}
          </div>

          <div className="movie-details__plot-section">
            <h3>Plot</h3>
            <p
              className="movie-details__plot"
              onClick={() => setShowFullPlot(true)}
            >
              {shortPlot}
              {movieDetails.Plot.length > 150 && (
                <span className="movie-details__read-more">
                  {" "}
                  Click to read more
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {showFullPlot && (
        <div className="plot-modal" onClick={() => setShowFullPlot(false)}>
          <div
            className="plot-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="plot-modal__close"
              onClick={() => setShowFullPlot(false)}
            >
              ×
            </button>
            <h2 className="plot-modal__title">Full Plot</h2>
            <p className="plot-modal__text">{movieDetails.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsPage;
