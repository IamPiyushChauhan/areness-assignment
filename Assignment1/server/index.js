const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config/Config");
const cors = require("cors");
const mongoose = require("mongoose");
var Router = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());

// Mount the router on a specific path
app.use("/", Router);

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
      wtimeout: 0,
      provenance: "clientSupplied",
    },
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const port = config.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
