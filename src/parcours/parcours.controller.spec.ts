import { connectToDatabase, dropCollections } from '../mongo';

import { MongoClient } from 'mongodb';
import { app } from '../app';
import request from 'supertest';

const parcourExemple1 = {
  title: 'Génie Logiciel',
  campus: 'Paris',
  durationInMonths: 24,
  type: 'Master',
  price: 12000,
  onSitePercentage: 50,
  beginDate: '2023-02-25',
  modules: [
    {
      title: `Systèmes d'information`,
      description: `Autour de la gestion d'information`,
    },
    {
      titre: 'ERP',
      description: 'Préparation Certification SAP',
    },
  ],
  description:
    'Un master dédié à l’étude des systèmes d’information ainsi que leur implémentation dans les entreprises',
};

const keywordsExemple = ['entreprises'];

describe('ParcoursController', () => {
  let client: MongoClient;
  let idParcour1: string;

  beforeAll(async () => {
    client = await connectToDatabase('mongodb://localhost:27018', 'test');
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

  it('should be able to get all parcours by keywords', async () => {
    const res = await request(app).get('/search').send(keywordsExemple);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should not be able to get a parcours without a correct id', async () => {
    const res = await request(app).get('/parcours/4edd40c86762e0fb12000003');
    expect(res.statusCode).toBe(404);
  });

  it('should be able to push a new parcours and get is id', async () => {
    const res = await request(app).post('/parcours').send(parcourExemple1);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual(parcourExemple1.title);

    idParcour1 = res.body.id;
  });

  it('should be able to get a parcours with a correct id', async () => {
    const res = await request(app).get(`/parcours/${idParcour1}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(parcourExemple1.title);
  });

  it('should be able to get all parcours', async () => {
    const res = await request(app).get('/parcours');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toEqual(parcourExemple1.title);
  });

  it('should be able to remove parcours to pricy', async () => {
    const res = await request(app).get('/parcours/cheaper/10000');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it('should be able to get a parcours with the good city', async () => {
    const res = await request(app).get('/parcours/city/PARIS');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toEqual(parcourExemple1.title);
  });

  it('should be able to return an empty list when called with a city without parcours', async () => {
    const res = await request(app).get('/parcours/city/strasbourg');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});
