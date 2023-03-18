import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
  var signIn: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "testNotInPod";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({}); // Reset all mongoose collections
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signIn = () => {
  // Build JWT payload {id, email}
  const payload = {
    id: "test",
    email: "test@test.com",
  };
  // Make the JWT token
  const userJwt = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: userJwt };
  // JSON to string
  const sessionJson = JSON.stringify(session);
  // encode it with base64 string
  const base64JWT = Buffer.from(sessionJson).toString("base64");
  // Place it in the cookie
  return [`session=${base64JWT}`];
};
