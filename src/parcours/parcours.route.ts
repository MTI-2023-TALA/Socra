import { ParcoursController } from './parcours.controller';
import { app } from '../app';

const controller: ParcoursController = new ParcoursController();
app.get('/parcours', async (req, res) => {
  await controller.getAllParcours(req, res);
});

app.post('/parcours', async (req, res) => {
  await controller.AddParcours(req, res);
});
