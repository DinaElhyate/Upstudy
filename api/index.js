import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import nodemailer from 'nodemailer';
import { db } from "./db.js";
import moment from "moment";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Fetch Comments for a Post
app.get("/api/comments/:postId", (req, res) => {
  const postId = req.params.postId;
  const query = "SELECT * FROM comments WHERE postId = ? ORDER BY date ASC";
  db.query(query, [postId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch comments." });
    }
    res.json(results);
  });
});

// Add a New Comment
app.post("/api/comments", (req, res) => {
  const { postId, userId, text } = req.body;

  // Fetch username from users table
  const userQuery = "SELECT username FROM users WHERE id = ?";
  db.query(userQuery, [userId], (err, userResult) => {
    if (err || userResult.length === 0) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch user." });
    }

    const username = userResult[0].username;
    const query =
      "INSERT INTO comments (postId, userId, username, text, date) VALUES (?, ?, ?, ?, ?)";
    const date = moment().format("YYYY-MM-DD HH:mm:ss");

    db.query(query, [postId, userId, username, text, date], (err, result) => {
      if (err) {
        console.error(err);
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

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, 
          auth: {
              user: 'dinaelhyate@gmail.com', 
              pass: 'fvlrnrdnfcffopyy', 
          },
          tls: {
              rejectUnauthorized: false, 
          },
      });

      console.log(`Message à envoyer :`);
      console.log(`De : ${email}`);
      console.log(`À : dinaelhyate@gmail.com`);
      console.log(`Objet : ${subject}`);
      console.log(`Message : ${message}`);

      // Correction ici : on envoie l'email depuis l'adresse de l'utilisateur (email)
      await transporter.sendMail({
          from: `"${name}" <${email}>`, // Ici, on définit le nom et l'email
          to: 'dinaelhyate@gmail.com',
          subject: subject, 
          text: message, 
      });

      res.status(200).json({ message: 'Message envoyé avec succès.' });
  } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      res.status(500).json({ error: 'Erreur lors de l envoi du message' });
  }
});



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Server is running on port 8800!");
});
