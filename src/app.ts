import { ParcoursController } from './parcours/parcours.controller';
import { ParcoursRoute } from './parcours/parcours.route';
import { ParcoursService } from './parcours/parcours.service';
import { connectToDatabase } from './mongo';
import express from 'express';

export const app = express();
const port = 3000;

app.use(express.json());
connectToDatabase();

new ParcoursRoute(new ParcoursController(new ParcoursService()));

app.listen(port, () => {
  console.log(`Socra app listening on port ${port}!`);
});
