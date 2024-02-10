import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";


// START -------- OUTLOOK
import { ConfidentialClientApplication } from '@azure/msal-node'; // New import for MSAL
import axios from 'axios'; // New import for making HTTP requests
// END -------- OUTLOOK

// Existing imports
import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import asanaRoutes from "./routes/asana.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

// Existing middleware setup
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


// Existing routes
app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);
app.use("/api/asana", asanaRoutes);
app.use("/api/", customerRoutes);

// Existing server setup for production
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














//-------------------------------MICROSOFT OUTLOOK


// MSAL configuration - New code
const msalConfig = {
  auth: {
      clientId: 'a86bced1-1c4d-4353-a2aa-95be118dacc5',
      authority: 'https://login.microsoftonline.com/6dc52137-c0d5-4a94-89b4-bd6609243e4f',
      clientSecret: 'pRo8Q~TuZ4oRbyN-yBMnW8iedZcU5nRJsQX3-b6r',
  }
};
const msalClient = new ConfidentialClientApplication(msalConfig);
console.log (msalClient);

// Function to get access token - New code
async function getAccessToken() {
  try {
      const response = await msalClient.acquireTokenByClientCredential({
          scopes: ['https://graph.microsoft.com/.default'],
      });
      return response.accessToken;
  } catch (error) {
      console.error('Error acquiring token:', error);
      throw error;
  }
}


// Webhook endpoint for Microsoft Graph - Updated code
app.post('/api/graph-webhook', async (req, res) => {
try {
    console.log('Received notification:', req.body);
    
    // Add logic to handle the notification
    // For example, validate clientState, fetch the email item, etc.

    res.status(200).send();
} catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
}
});

// ... rest of your existing app code

// Function to create subscription - New code
async function createMailboxSubscription() {
  const accessToken = await getAccessToken();
  const subscriptionData = {
      changeType: 'created',
      notificationUrl: 'https://newman-api.getpostman.com/run/23284850/c7a19fa3-cc12-45b9-8440-cc471bc4cc10', // Update with your public domain
      resource: 'users/support@rize.bm/mailFolders/inbox/messages',
      expirationDateTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour from now, adjust as needed
      clientState: 'YourClientState' // Replace with a secret client state
  };

  try {
      const response = await axios.post(
          'https://graph.microsoft.com/v1.0/subscriptions',
          subscriptionData,
          { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log('Subscription created:', response.data);
  } catch (error) {
      console.error('Error creating subscription:', error);
      console.error('Error creating subscription 2:', error.response);
  }
}

// Call this function at app startup
createMailboxSubscription();
// HELP AT 
// https://learn.microsoft.com/en-us/graph/api/subscription-post-subscriptions?view=graph-rest-1.0&tabs=http












export default app;
