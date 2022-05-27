import { Collection, MongoClient } from 'mongodb';

const mongoClient = new MongoClient('mongodb://localhost:27017');
export let parcoursCollection: Collection;

export async function connectToDatabase(): Promise<void> {
  await mongoClient.connect();
  console.log('Connected successfully to server');
  const db = mongoClient.db('mongo');
  parcoursCollection = db.collection('parcours');
}
