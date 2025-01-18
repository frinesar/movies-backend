const request = require("supertest");
const DB = require("./db");
const app = require("./app");
const uuid = require("uuid");

let id = "";
let reviewID = "";
const username = uuid.v4();
const password = uuid.v4();
let accessToken = "";

describe("Test the root path", () => {
  test("GET method '/test'", async () => {
    const response = await request(app).get("/test");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Working");
  });
});

describe("User + auth + wishlist + watchedlist + reviews", () => {
  beforeAll(() => {
    DB.connectDB();
  });

  test("Create new user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ username, password });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    id = await response.body.id;
  });

  test("Login new user", async () => {
    const response = await request(app)
      .post(`/api/users/login`)
      .send({ username, password });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    accessToken = await response.body.accessToken;
  });

  test("Get user's wishlist", async () => {
    const response = await request(app)
      .get(`/api/wishlist`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Add to wishlist", async () => {
    const response = await request(app)
      .post(`/api/wishlist/550`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("movieID");
  });

  test("Change status in wishlist", async () => {
    const response = await request(app)
      .put(`/api/wishlist/550`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("isWatched", true);
  });

  test("Delete from wishlist without token", async () => {
    const response = await request(app).delete(`/api/wishlist/550`);
    expect(response.statusCode).toBe(401);
  });

  test("Delete from wishlist", async () => {
    const response = await request(app)
      .delete(`/api/wishlist/550`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(201);
  });

  test("Get user's watched list", async () => {
    const response = await request(app)
      .get(`/api/watchedMoviesList`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Add to watched list", async () => {
    const response = await request(app)
      .post(`/api/watchedMoviesList/550`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("movieID");
  });

  test("Delete from watched list", async () => {
    const response = await request(app)
      .delete(`/api/watchedMoviesList/550`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(201);
  });

  test("Create new review", async () => {
    const response = await request(app)
      .post(`/api/reviews`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        movieID: 550,
        text: "review for Fight Club",
        personalRating: 9,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("text", "review for Fight Club");
    reviewID = response.body.reviewID;
  });

  test("Update new review", async () => {
    const response = await request(app)
      .put(`/api/reviews/${reviewID}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        text: "updated review for Fight Club",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "text",
      "updated review for Fight Club"
    );
  });

  test("Delete new review", async () => {
    const response = await request(app)
      .delete(`/api/reviews/${reviewID}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(201);
  });

  test("Delete new user", async () => {
    const response = await request(app)
      .delete(`/api/users`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        id,
      });
    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    DB.disconnectDB();
  });
});
