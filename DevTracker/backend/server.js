require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/user", require("./routes/UsersRoutes"));
app.use("/admin", require("./routes/projectRoutes"));
app.use("/dev", require("./routes/projectRoutes"));
app.use(errorHandler);


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
