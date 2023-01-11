const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

let db = null;

const dbPath = path.join(__dirname, "goodreads.db");

const intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`Error: ${e.message}`);
    process.exit(1);
  }
};

intializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id;`;
  const getBooks = await db.all(getBooksQuery);
  response.send(getBooks);
});
