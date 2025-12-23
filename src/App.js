import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_KEY = "7f92ef68";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const searchMovies = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setCurrentPage(1);
    try {
      const response = await fetch(`${API_URL}&s=${query}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        console.log(data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    searchMovies(searchQuery);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchQuery);
    }
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    setCurrentPage(1);

    if (value === "none") {
      return;
    }

    const sortedMovies = [...movies].sort((a, b) => {
      const yearA = parseInt(a.Year);
      const yearB = parseInt(b.Year);

      if (value === "asc") {
        return yearA - yearB;
      } else if (value === "desc") {
        return yearB - yearA;
      }
      return 0;
    });

    setMovies(sortedMovies);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    alert("Please email the creator of this site at BenjaminTFeder@gmail.com");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <Navbar
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onInputChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onContactClick={handleContactClick}
        user={user}
        onAuthClick={() => setShowAuth(true)}
      />
      <Main
        movies={movies}
        loading={loading}
        onSortChange={handleSortChange}
        user={user}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Footer onContactClick={handleContactClick} />
      {showAuth && <Auth user={user} onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default App;
