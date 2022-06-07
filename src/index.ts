import { app } from './app';
import { connectToDatabase } from './mongo';

const port = 3000;

async function initApp() {
  await connectToDatabase('mongodb://localhost:27017');

  app.listen(port, () => {
    console.log(`Socra app listening on port ${port}!`);
  });
}

initApp();
