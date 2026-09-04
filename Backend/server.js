
import { config } from "dotenv";
config({ path: "./config/config.env" });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import docterRouter from "./router/doctorsRouter.js"
import connectCloudinary from "./config/cloudinary.js";

import { createAdmin } from "./utils/createAdmin.js";
const app = express();

/* =========================
   CORS
========================= */

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

/* =========================
   MIDDLEWARES
========================= */

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("Hospital API is working");
});
app.use("/api/user", userRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/message", messageRouter);
app.use("/api/doctor",docterRouter)
/* =========================
   ERROR MIDDLEWARE
========================= */

app.use(errorMiddleware);

/* =========================
   DATABASE
========================= */
createAdmin();
dbConnection();
connectCloudinary();

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});