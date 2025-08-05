import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaBook } from "react-icons/fa";
import Controls from "./components/Controls";
import BookTable from "./components/BookTable";

function App() {
  const [region, setRegion] = useState("en_US");
  const [seed, setSeed] = useState("2101");
  const [likes, setLikes] = useState(3.5);
  const [reviews, setReviews] = useState(2.7);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef();

  const fetchBooks = useCallback(
    async (pageNumber = 1, reset = false) => {
      try {
        const query = `region=${region}&seed=${seed}&likes=${likes}&reviews=${reviews}&page=${pageNumber}`;
        const res = await fetch(
          `https://itransition-task5-u4rg.onrender.com/api/books?${query}`
        );
        const data = await res.json();

        if (reset) {
          setBooks(data);
        } else {
          setBooks((prev) => [...prev, ...data]);
        }

        if (data.length === 0) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    },
    [region, seed, likes, reviews]
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchBooks(1, true);
  }, [region, seed, likes, reviews, fetchBooks]);

  // Infinite scroll
  useEffect(() => {
    const target = loader.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore]);

  useEffect(() => {
    if (page === 1) return;
    fetchBooks(page);
  }, [page, fetchBooks]);

  const handleChange = (key, value) => {
    if (key === "region") setRegion(value);
    if (key === "seed") setSeed(value);
    if (key === "likes") setLikes(value);
    if (key === "reviews") setReviews(value);
  };

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 100000).toString();
    setSeed(randomSeed);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">
        <FaBook /> Book Generator
      </h1>

      <Controls
        region={region}
        seed={seed}
        likes={likes}
        reviews={reviews}
        onChange={handleChange}
        onRandomizeSeed={handleRandomSeed}
      />

      <BookTable books={books} />
      <div ref={loader} style={{ height: "50px" }} />
    </div>
  );
}

export default App;
