import { app } from './app';
import { connectToDatabase } from './mongo';

const port = 3000;

async function initApp() {
  const urlMongo = process.env.URL_MONGO ?? 'mongodb://localhost:27017';
  await connectToDatabase(urlMongo, 'mongo');

  app.listen(port, () => {
    console.log(`Socra app listening on port ${port}!`);
  });
}

initApp();
