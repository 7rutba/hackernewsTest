import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewsList from "./NewsList";
import Pagination from "./Peginatiion";
import { CiSearch, CiSettings } from "react-icons/ci";
import logo from "../assets/logo.png";
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const Home = () => {
  const userdetail = JSON.parse(localStorage.getItem("userDetails"));
  console.log("user detail", userdetail);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchResults = async (searchQuery = query, pageNo = 0) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://hn.algolia.com/api/v1/search?query=${searchQuery}&tags=story&page=${pageNo}`
      );
      const data = await response.json();
      setResults(data.hits);
      setTotalPages(data.nbPages);

      navigate(`?query=${searchQuery}&page=${pageNo}`, { replace: true });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((searchQuery) => {
    setPage(0);
    fetchResults(searchQuery, 0);
  }, 300);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("query") || "";
    const pageNo = parseInt(params.get("page"), 10) || 0;

    setQuery(searchQuery);
    setPage(pageNo);
    fetchResults(searchQuery, pageNo);
  }, []);

  return (
    <>
      <div className="w-[80%] mx-auto bg-gray-100">
        <div className="flex gap-4 bg-orange-500 w-full px-6 py-4 justify-between">
          <div className="w-2/12 flex items-center">
            <img className="w-10 h-10" src={logo} alt="Logo" />
            <h2 className="ml-2 font-bold text-white">
              {userdetail?.username}
            </h2>
          </div>
          <div className="bg-white px-4 flex items-center gap-4 py-3 w-9/12">
            <CiSearch className="text-orange-500 w-8 h-8 font-semibold" />
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Search stories by title, URL, or author"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
          <div className="w-1/12 flex items-center">
            <CiSettings className="h-10 w-10 text-white" />
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <NewsList newsData={results} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setPage(newPage);
                fetchResults(query, newPage);
              }}
            />
          </>
        )}
      </div>

      <div className="flex text-white my-4 text-sm text-center justify-center">
        <p>About •</p> <p>Setting •</p>{" "}
        <p> This project is developed by Ritesh Kumar </p>
      </div>
    </>
  );
};

export default Home;
