const express = require("express");
const cors = require("cors");    
const path = require("path");


const indexRouter = require("./routes/index.route.js"); // Import the index routes


// Initialize the app
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));

//routes
// Use the index router for all API routes
app.use(indexRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
