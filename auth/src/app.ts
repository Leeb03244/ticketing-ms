import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/currentuser";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "@blee-org/common";
import { NotFoundError } from "@blee-org/common";

const app = express();
// We are behind Nginx proxy so trust it
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // JEST and supertest uses HTTP connection requests
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

export { app };
