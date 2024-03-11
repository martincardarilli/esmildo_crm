import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js"; // native
import asanaRoutes from "./routes/asana.routes.js"; // external
//import asanaTasksRoutes from "./routes/asanatask.routes.js"; // completed tasks
import customerRoutes from "./routes/customer.routes.js";
import historyRoutes from "./routes/history.routes.js";
import clockifyRoutes from "./routes/clockify.routes.js";
import runRoutes from "./routes/run.routes.js";

import http from "http";
import https from "https";
import fs from "fs";


import { FRONTEND_URL } from "./config.js";

const app = express();

// > prod
// ssh -i C:\Users\Anonymous\Desktop\RIZE\Rize-backend.pem ubuntu@3.88.172.25
// sudo npm run build
// sudo npm run start

// > dev
// npm run dev (x2)

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// native
app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);

// added
app.use("/api/asana", asanaRoutes);
app.use("/api/", customerRoutes);
app.use("/api/", historyRoutes);
//app.use("/api/", asanaTasksRoutes);// asanatask.routes.js no está incluido
// se crean internamente
app.use("/api/clockify", clockifyRoutes);
app.use("/api/", runRoutes);

    // Read the SSL certificate and key
   // const privateKey = fs.readFileSync('/home/ubuntu/crm.rize.bm.key', 'utf8');
   // const certificate = fs.readFileSync('/home/ubuntu/crm.rize.bm.pem', 'utf8');
   // const credentials = { key: privateKey, cert: certificate };

if (process.env.NODE_ENV === "production") {
  (async () => {

    const path = await import("path");
    app.use(express.static("client/dist"));
    
    app.get("*", (req, res) => {
      console.log(path.resolve("client", "dist", "index.html"));
      res.sendFile(path.resolve("client", "dist", "index.html"));
    });
    


    // Create an HTTPS server
   // const httpsServer = https.createServer(credentials, app);

    // Create an HTTP server
    const httpServer = http.createServer(app);

    // Listen on both HTTP and HTTPS
    const HTTP_PORT = 80;
    const HTTPS_PORT = 443;

    httpServer.listen(HTTP_PORT, () => {
      console.log(`HTTP Server running on port ${HTTP_PORT}`);
    });

    //httpsServer.listen(HTTPS_PORT, () => {
    //  console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
    //});

  })();
} else {

    console.log(`client runned in other terminal as dev react independly`);

    (async () => {

      const path = await import("path");
    /*  app.use(express.static("client/dist"));
      
      app.get("*", (req, res) => {
        console.log(path.resolve("client", "dist", "index.html"));
        res.sendFile(path.resolve("client", "dist", "index.html"));
      }); */
      
  
  
      // Create an HTTPS server
      //const httpsServer = https.createServer(credentials, app);
  
      // Create an HTTP server
      const httpServer = http.createServer(app);
  
      // Listen on both HTTP and HTTPS
      const HTTP_PORT = 80;
     // const HTTPS_PORT = 443;
  
      httpServer.listen(HTTP_PORT, () => {
        console.log(`HTTP Server running on port ${HTTP_PORT}`);
      });
  
    //  httpsServer.listen(HTTPS_PORT, () => {
    //    console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
    //  });
  
    })();

}

export default app;
