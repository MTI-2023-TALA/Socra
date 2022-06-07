import { Collection, Db, MongoClient } from 'mongodb';

export let parcoursCollection: Collection;

let db: Db;

export async function dropCollections() {
  await db.dropDatabase();
}

export async function connectToDatabase(connectionUrl: string): Promise<MongoClient> {
  const mongoClient = new MongoClient(connectionUrl);
  await mongoClient.connect();
  console.log('Connected successfully to server');
  db = mongoClient.db('mongo');
  parcoursCollection = db.collection('parcours');
  return mongoClient;
}
