import request from 'supertest';
import { app } from '../routes/users'; // Importer correctement l'application Express
import * as dbModule from '../db.js'; // Importer le module db pour le mock

// Mock la fonction db.query
jest.mock('../db');

describe('Post Routes', () => {
  it('should create a new post', async () => {
    const mockPostData = {
      title: 'Test Post',
      desc: 'This is a test post',
      cat: 'General',
      date: '2024-12-01',
    };

    const mockResult = { insertId: 1 };
    dbModule.db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, mockResult); // Simuler une insertion réussie
    });


    
    // Vérification de l'appel à db.query
    
  });
});