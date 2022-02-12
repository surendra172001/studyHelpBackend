if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((obj) => {
    console.log("Connection Successful");
  })
  .catch((databaseConnectionError) => {
    console.error(databaseConnectionError);
    console.error("DATABASE CONNECTION ERROR");
  });

app.use("/api/user", require("./routes/user.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/doc", require("./routes/doc.js"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
