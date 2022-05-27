import { ParcoursController } from './parcours/parcours.controller';
import { ParcoursRepository } from './parcours/parcours.repository';
import { ParcoursRoute } from './parcours/parcours.route';
import { ParcoursService } from './parcours/parcours.service';
import { connectToDatabase } from './mongo';
import express from 'express';

export const app = express();
const port = 3000;

app.use(express.json());
connectToDatabase();

new ParcoursRoute(new ParcoursController(new ParcoursService(new ParcoursRepository())));

app.listen(port, () => {
  console.log(`Socra app listening on port ${port}!`);
});
