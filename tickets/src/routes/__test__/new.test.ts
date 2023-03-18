import { RequestValidationError } from "@blee-org/common";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";

it("Route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("Cannot access if auth is not set on /api/tickets", async () => {
  return await request(app).post("/api/tickets").send({}).expect(401);
});

it("Can access if JWT is set in a cookie trying to access /api/tickets", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn()) // Refer to the setup.ts for how to get the cookie
    .send({});

  expect(response.status).not.toEqual(401);
});

it("Returns an error if invalid title is provided", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "",
      price: 50,
    });

  expect(response.status).toEqual(400);

  const response2 = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      price: 50,
    });

  expect(response2.status).toEqual(400);
});

it("Returns an error if invalid price is provided", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "Testing Title",
      price: -10,
    });

  expect(response.status).toEqual(400);

  const response2 = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "Testing title 2",
    });

  expect(response2.status).toEqual(400);
});

it("Creates a ticket if valid params are passed in", async () => {
  const tickets = await Ticket.find({}); // Get all tickets
  expect(tickets.length).toEqual(0);

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "Star Wars",
      price: 10,
    });

  const ticketsAfter = await Ticket.find({}); // Get all tickets
  expect(ticketsAfter.length).toEqual(1);

  expect(response.statusCode).toEqual(201);
});
