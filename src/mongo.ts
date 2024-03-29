import { Collection, Db, MongoClient } from 'mongodb';

export let parcoursCollection: Collection;

let db: Db;

export async function dropCollections() {
  await db.collection('parcours').deleteMany({});
}

export async function connectToDatabase(connectionUrl: string, dbName: string): Promise<MongoClient> {
  console.log(`Trying to connect to MongoDb using ${connectionUrl}`);
  const mongoClient = new MongoClient(connectionUrl);
  await mongoClient.connect();
  console.log('Connected successfully to server');
  db = mongoClient.db(dbName);
  parcoursCollection = db.collection('parcours');
  return mongoClient;
}
