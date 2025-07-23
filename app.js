import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { connect } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());
connect();

app.use("/auth", routes.authRouter);
app.use("/org", routes.orgRouter);
app.use("/user", routes.userRouter);
app.use("/todo", routes.todoRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
