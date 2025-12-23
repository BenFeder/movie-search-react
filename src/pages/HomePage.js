import React from "react";
import Main from "../components/Main";

function HomePage({
  searchQuery,
  onSearch,
  onInputChange,
  onKeyPress,
  movies,
  loading,
  onSortChange,
  sortOrder,
  user,
  currentPage,
  onPageChange,
}) {
  return (
    <Main
      movies={movies}
      loading={loading}
      onSortChange={onSortChange}
      sortOrder={sortOrder}
      user={user}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
}

export default HomePage;
