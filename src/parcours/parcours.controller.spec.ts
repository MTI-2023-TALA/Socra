import { connectToDatabase, dropCollections, parcoursCollection } from '../mongo';

import { MongoClient } from 'mongodb';
import { app } from '../app';
import request from 'supertest';

describe('ParcoursController', () => {
  let client: MongoClient;

  beforeAll(async () => {
    client = await connectToDatabase('mongodb://localhost:27018');
    await dropCollections();
  });

  afterAll(async () => {
    await dropCollections();
    await client.close();
  });

  it('should be able to get all parcours', async () => {
    const res = await request(app).get('/parcours');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
