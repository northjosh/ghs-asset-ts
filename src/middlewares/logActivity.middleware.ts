import { NextFunction, Request, Response } from "express";
import { Activity } from "../models/Activity";
import { verify } from "jsonwebtoken";

const logActivity = (req:Request, res: Response, next: NextFunction) => {
  // Extract user ID from the request headers
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  let userId:any;

  if (req.originalUrl === "api/user/login" && req.method === "POST") {
    // If it's a login request, use the username as the userId
    userId = req.body.username;
  } else if (token) {
    // Verify and decode the token
    verify(token, process.env.AUTH_SECRET!, (err:any, user:any) => {
      if (err) {
        console.error("Error verifying token:", err);
      } else {
        // Extract user ID from the decoded token
        userId = user.id;
      }
    });
  }

  console.log(`User ID: ${userId}`);
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);

  // Store the original res.send functions
  const originalSend = res.send;

  // Check if the request is not for the login endpoint
  if (req.originalUrl !== "/api/user/login" || req.method !== "POST") {
    
    // Override res.send
    res.send = function (): any {
      // Create a new ActivityLog instance
      console.log("Creating activity log");
      const activity = new Activity({
        userId,
        action: `${req.method} ${req.originalUrl}`,
        details: {
          request: {
            headers: req.headers,
            params: req.params,
            body: req.body,
          },
          response: {
            status: res.statusCode,
            body: arguments[0] ? JSON.parse(arguments[0]) : null,
          },
        },
      });

      console.log(`Activity to be saved: ${JSON.stringify(activity)}`);

      // Save the activity log
      activity
        .save()
        .then(() => {
          console.log("Activity saved successfully");
        })
        .catch((error:any) => {
          console.error("Error saving activity log:", error);
        });

      // Call the original res.send function
      originalSend.apply(this, arguments as any);
    };

  } else if (req.originalUrl === "/api/user/login" && req.method === "POST") {
    console.log;
    // Override res.send for login route
    // Override res.send for login route
    res.send = function (): any {
      // Call the original res.send function
      originalSend.apply(this, arguments as any);

      // Parse the response body
      const responseBody = arguments[0] ? JSON.parse(arguments[0]) : {};

      // Extract the userId from the response body
      const userId = responseBody.userId;
      console.log("Creating activity log");
      const activity = new Activity({
        userId,
        action: `${req.method} ${req.originalUrl}`,
        details: {
          request: {
            headers: req.headers,
            params: req.params,
            body: req.body,
          },
          response: {
            status: res.statusCode,
            body: responseBody,
          },
        },
      });

      console.log(`Activity to be saved: ${JSON.stringify(activity)}`);

      // Save the activity log
      activity
        .save()
        .then(() => {
          console.log("Activity saved successfully");
        })
        .catch((error:any) => {
          console.error("Error saving activity log:", error);
        });
    };
  }

  next();
};

export { logActivity };
