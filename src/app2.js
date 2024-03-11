import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import asanaRoutes from "./routes/asana.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import propiedadRoutes from "./routes/propiedad.routes.js";
import historyRoutes from "./routes/history.routes.js";


import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);
app.use("/api/asana", asanaRoutes);
app.use("/api/", customerRoutes);
app.use("/api/", propiedadRoutes);
app.use("/api/", historyRoutes);
// asanatask.routes.js no esta incluido


if (process.env.NODE_ENV === "production") {
  (async () => {
    const path = await import("path");
    app.use(express.static("client/dist"));

    app.get("*", (req, res) => {
      console.log(path.resolve("client", "dist", "index.html"));
      res.sendFile(path.resolve("client", "dist", "index.html"));
    });
  })();
}


export default app;
