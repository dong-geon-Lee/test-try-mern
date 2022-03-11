const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const connectedDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 8000;

connectedDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("../server/routes/goalRoutes"));
app.use("/api/users", require("../server/routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`http://localhost:${port}`.underline.blue));
