const express = require("express");
const app = express();
const cors = require("cors");
const BASE_URL = `http://localhost:8080`;

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const con = require("./db/connection.js");

// using routes
app.use(require("./routes/route"));

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Node server running",
  });
});

con
  .then((db) => {
    if (!db) return process.exit(1);

    // listen to the http server
    app.listen(port, () => {
      console.log(`Server is running on port: ${BASE_URL}`);
    });

    app.on("error", (err) =>
      console.log(`Failed to connect with HTTP Server: ${err}`)
    );
    // error in mongodb connection
  })
  .catch((error) => {
    console.log(`Connection Failed...!${error}`);
  });
