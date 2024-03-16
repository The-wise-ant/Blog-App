const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/errorMiddleware");

const FRONTEND = process.env.FRONTEND;

const corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


dotenv.config(corsOptions);

const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error Database at " + err));

//////// Middlewares/////////
app.use(express.json());
app.use(cors());
 //////////////////////////

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);



app.get("/", (req, res)=>{
  res.send("Hello index")
});

app.get("/blog", (req, res)=>{
  res.send("Hello Bog")
});

app.use(errorMiddleware);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server connected at port: " + PORT);
});
