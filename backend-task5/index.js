const express = require("express");
const cors = require("cors");
const { generateBooks } = require("./utils/generateBook");

const app = express();
app.use(cors());

app.get("/api/books", (req, res) => {
  const { region, seed, likes, reviews, page } = req.query;

  try {
    const books = generateBooks(
      region,
      seed,
      parseFloat(likes),
      parseFloat(reviews),
      parseInt(page) || 1
    );
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate books" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
