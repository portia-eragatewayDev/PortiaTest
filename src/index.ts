require("dotenv").config();
import express from "express";
import CustomerRouter from "./routes/customers";
import UserRouter from "./routes/users";

console.log(process.env.DATABASE_URL);

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



app.use("/api/v1", CustomerRouter);
app.use("/api/v1", UserRouter);





 