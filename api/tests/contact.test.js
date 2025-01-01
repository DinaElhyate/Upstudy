import request from 'supertest';
import express from 'express';
import nodemailer from 'nodemailer';
import { db } from '../db.js';

// Mock de nodemailer
jest.mock('nodemailer');

const app = express();
app.use(express.json());

// Route pour envoyer un message
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

      await transporter.sendMail({
          from: `"${name}" <${email}>`,
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

describe('POST /api/contact', () => {
  it('should return 400 if any field is missing', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Dina',
        email: 'dinaelhyate@gmail.com',
        subject: 'Test',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Tous les champs sont obligatoires.');
  });

  it('should send the email successfully and return 200', async () => {
    // Mock de la fonction sendMail de nodemailer
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockResolvedValue('Email sent'),
    });

    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Dina',
        email: 'dinaelhyate@gmail.com',
        subject: 'Test Subject',
        message: 'Test Message',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Message envoyé avec succès.');
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: '"Dina" <dina@example.com>',
      to: 'dinaelhyate@gmail.com',
      subject: 'Test Subject',
      text: 'Test Message',
    });
  });

  it('should return 500 if there is an error sending the email', async () => {
    // Mock de l'erreur dans la fonction sendMail de nodemailer
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockRejectedValue(new Error('SMTP error')),
    });

    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Dina',
        email: 'dinaelhyate@gmail.com',
        subject: 'Test Subject',
        message: 'Test Message',
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Erreur lors de l envoi du message');
  });
});
