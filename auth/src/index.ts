import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/currentuser";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();
// We are behind Nginx proxy so trust it
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
// For cookie session JWTs, we don't encrypt the JWT contents since it might be hard to decrypt in other languages
// we secure it to prevent tampering

//ROUTES
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

//ROUTE NOT FOUND
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

//ERROR HANDLER - will process errors from above
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Auth service connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Auth service listening on port 3000");
  });
};

start();
