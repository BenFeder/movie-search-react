import React from "react";
import Pagination from "./Pagination";

function Main({
  movies,
  loading,
  onSortChange,
  sortOrder,
  user,
  currentPage,
  onPageChange,
}) {
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  // Show only first 6 results if user is not logged in
  const displayedMovies = user
    ? movies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : movies.slice(0, ITEMS_PER_PAGE);

  return (
    <>
      {/* Sort Controls */}
      <div
        className="sort-controls"
        id="sortControls"
        style={{ display: movies.length > 0 ? "flex" : "none" }}
      >
        <label htmlFor="sortSelect" className="sort-controls__label">
          Sort by Release Date:
        </label>
        <select
          id="sortSelect"
          className="sort-controls__select"
          onChange={onSortChange}
          value={sortOrder}
        >
          <option value="none">None</option>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Main Results Section */}
      <div className="results" id="results">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : movies.length > 0 ? (
          <>
            <div className="movies-grid">
              {displayedMovies.map((movie) => (
                <div key={movie.imdbID} className="movie-card">
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "./assets/walk-of-fame.jpg"
                    }
                    alt={movie.Title}
                    className="movie-card__poster"
                  />
                  <div className="movie-card__info">
                    <h3 className="movie-card__title">{movie.Title}</h3>
                    <p className="movie-card__year">{movie.Year}</p>
                  </div>
                </div>
              ))}
            </div>

            {!user && movies.length > ITEMS_PER_PAGE && (
              <div className="pagination-message">
                <p>
                  Login to see all {movies.length} results and use pagination
                </p>
              </div>
            )}

            {user && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </>
        ) : (
          <div className="no-results">
            <p>Search for movies to see results</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Main;
