import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";
import mongoose from "mongoose";

it("return 404 if ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("return ticket if ticket is found", async () => {
  const tickets = await Ticket.find({}); // Get all tickets
  expect(tickets.length).toEqual(0);

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "Star Wars",
      price: 10,
    });

  const fetchRes = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(fetchRes.body.title).toEqual("Star Wars");
});
