import request from "supertest";
import express from "express";
import { db } from "../db.js";
import moment from "moment";

// Mock la base de données
jest.mock("../db.js");

const app = express();
app.use(express.json());

// Endpoint pour récupérer les commentaires
app.get("/api/comments/:postId", (req, res) => {
  const postId = req.params.postId;
  const query = "SELECT * FROM comments WHERE postId = ? ORDER BY date ASC";
  db.query(query, [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch comments." });
    }
    res.json(results);
  });
});

// Endpoint pour ajouter un commentaire
app.post("/api/comments", (req, res) => {
  const { postId, userId, text } = req.body;

  const userQuery = "SELECT username FROM users WHERE id = ?";
  db.query(userQuery, [userId], (err, userResult) => {
    if (err || userResult.length === 0) {
      return res.status(500).json({ error: "Failed to fetch user." });
    }

    const username = userResult[0].username;
    const query =
      "INSERT INTO comments (postId, userId, username, text, date) VALUES (?, ?, ?, ?, ?)";
    const date = moment().format("YYYY-MM-DD HH:mm:ss");

    db.query(query, [postId, userId, username, text, date], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to add comment." });
      }

      res.json({
        id: result.insertId,
        postId,
        userId,
        username,
        text,
        date,
      });
    });
  });
});

describe("Comments API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/comments/:postId", () => {
    it("should return comments for a given postId", async () => {
      const mockComments = [
        { id: 1, postId: 1, userId: 1, username: "user1", text: "Comment 1", date: "2025-01-01" },
        { id: 2, postId: 1, userId: 2, username: "user2", text: "Comment 2", date: "2025-01-02" },
      ];

      db.query.mockImplementationOnce((query, params, callback) => {
        callback(null, mockComments);
      });

      const response = await request(app).get("/api/comments/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockComments);
    });

    it("should return 500 if there is a database error", async () => {
      db.query.mockImplementationOnce((query, params, callback) => {
        callback(new Error("Database error"));
      });

      const response = await request(app).get("/api/comments/1");
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to fetch comments.");
    });
  });

  describe("POST /api/comments", () => {
    it("should add a new comment successfully", async () => {
      db.query.mockImplementationOnce((query, params, callback) => {
        callback(null, [{ username: "testuser" }]); // Mock user query
      });
      db.query.mockImplementationOnce((query, params, callback) => {
        callback(null, { insertId: 1 }); // Mock insert query
      });

      const response = await request(app).post("/api/comments").send({
        postId: 1,
        userId: 1,
        text: "Test comment",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        postId: 1,
        userId: 1,
        username: "testuser",
        text: "Test comment",
        date: expect.any(String),
      });
    });

    it("should return 500 if user is not found", async () => {
      db.query.mockImplementationOnce((query, params, callback) => {
        callback(null, []); // Mock no user found
      });

      const response = await request(app).post("/api/comments").send({
        postId: 1,
        userId: 1,
        text: "Test comment",
      });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to fetch user.");
    });

    it("should return 500 if there is a database error during user fetch", async () => {
      db.query.mockImplementationOnce((query, params, callback) => {
        callback(new Error("Database error")); // Mock user query error
      });

      const response = await request(app).post("/api/comments").send({
        postId: 2,
        userId: 1,
        text: "Test comment",
      });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to fetch user.");
    });

    it("should return 500 if there is a database error during insertion", async () => {
      db.query.mockImplementationOnce((query, params, callback) => {
        callback(null, [{ username: "testuser" }]); // Mock user query
      });
      db.query.mockImplementationOnce((query, params, callback) => {
        callback(new Error("Database error")); // Mock insert error
      });

      const response = await request(app).post("/api/comments").send({
        postId: 3,
        userId: 1,
        text: "Test comment",
      });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to add comment.");
    });
  });
});
