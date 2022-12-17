import request from "supertest";
import { app } from "../../app";

it("Responds with current user details if authenticated", async () => {
  const authCookie = await global.signIn();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", authCookie)
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("Responds with null if not authenticated", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);

  expect(response.body.currentUser).toEqual(null);
});
