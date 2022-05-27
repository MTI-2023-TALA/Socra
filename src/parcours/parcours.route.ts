import { ParcoursController } from './parcours.controller';
import { app } from '../app';

export class ParcoursRoute {
  constructor(private readonly parcoursController: ParcoursController) {
    app.get('/parcours', async (req, res) => {
      await parcoursController.getAllParcours(req, res);
    });

    app.post('/parcours', async (req, res) => {
      await parcoursController.addParcours(req, res);
    });
  }
}
