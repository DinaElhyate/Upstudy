// tests/login.test.js
import request from "supertest";
import express from "express";
import { login } from "../controllers/auth.js";
import { db } from "../db.js";
import bcrypt from "bcrypt";
// Mock de la base de données
jest.mock("../db.js");

const app = express();
app.use(express.json());
app.post("/login", login);

describe("POST /login", () => {
  it("should login successfully with valid credentials", async () => {
    // Simuler la réponse de la base de données avec un utilisateur existant
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, [{ id: 1, username: "testuser", password: "$2a$10$xxxxxx" }]); // Simuler un utilisateur existant
    });

    // Simuler la comparaison du mot de passe avec bcrypt
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    const response = await request(app)
      .post("/login")
      .send({
        username: "testuser",
        password: "password123",
      });

    expect(response.status);
    expect(response.body.message);
    expect(response.body.user);
  });

  it("should return 404 if user not found", async () => {
    // Simuler la base de données sans utilisateur trouvé
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, []); // Aucun utilisateur trouvé
    });

    const response = await request(app)
      .post("/login")
      .send({
        username: "testuser",
        password: "password123",
      });

    expect(response.status).toEqual(404);
  });

  it("should return 400 if password is incorrect", async () => {
    // Simuler la réponse de la base de données avec un utilisateur valide
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, [{ id: 1, username: "testuser", password: "$2a$10$xxxxxx" }]); // Utilisateur valide
    });

    // Simuler un échec de la comparaison du mot de passe
    bcrypt.compare = jest.fn().mockResolvedValue(false);

    const response = await request(app)
      .post("/login")
      .send({
        username: "testuser",
        password: "wrongpassword",
      });

    expect(response.status).toEqual(400);
  });

  it("should return 500 if there is a database error", async () => {
    // Simuler une erreur de base de données
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error("Database error"));
    });

    const response = await request(app)
      .post("/login")
      .send({
        username: "testuser",
        password: "password123",
      });

    expect(response.status).toEqual(500);
  });
});