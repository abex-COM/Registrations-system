const express = require("express");
const cors = require("cors");
const fs = require("fs");
const userRoute = require("./Routes/usersRoute");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

const PORT = 8000;
app.use("/api/v1/users", userRoute);

// server start
app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
