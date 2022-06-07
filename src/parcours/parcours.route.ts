import { ParcoursController } from './parcours.controller';
import { app } from '../app';

export class ParcoursRoute {
  constructor(private readonly parcoursController: ParcoursController) {
    app.get('/parcours', async (req, res) => {
      await parcoursController.getAllParcours(req, res);
    });

    app.get('/parcours/:id', async (req, res) => {
      await parcoursController.getParcoursById(req, res);
    });

    app.post('/parcours', async (req, res) => {
      await parcoursController.addParcours(req, res);
    });

    app.patch('/parcours/:id', async (req, res) => {
      const id = req.params.id;
      await parcoursController.updateParcours(id, req, res);
    });
  }
}
