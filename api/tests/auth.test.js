import request from "supertest";
import express from "express";
import { register } from "../controllers/auth.js";
import { db } from "../db.js";

// Mock the database query method
jest.mock("../db.js");

const app = express();
app.use(express.json());
app.post("/register", register);

describe("POST /register", () => {
  it("should register a new user successfully", async () => {
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, []); // Simulate no existing user
    });
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { insertId: 1 }); // Simulate successful insertion
    });

    const response = await request(app)
      .post("/register")
      .send({
        userType: "user",
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });

    expect(response.status).toBe(200);
    expect(response.body).toBe("User has been created.");
  });

  it("should return 409 if user already exists", async () => {
    // Mocking the database responses
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, [{ id: 1 }]); // Simulate that user already exists
    });

    const response = await request(app)
      .post("/register")
      .send({
        userType: "user",
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });

    expect(response.status).toBe(409);
    expect(response.body).toBe("User already exists!");
  });

  it("should return 500 if there is a database error", async () => {
    // Mocking the database error response
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error("Database error"));
    });

    const response = await request(app)
      .post("/register")
      .send({
        userType: "user",
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });

    
  });
});