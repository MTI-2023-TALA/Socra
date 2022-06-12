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

    app.get('/parcours/city/:city', async (req, res) => {
      await parcoursController.getParcoursWithCity(req, res);
    });

    app.get('/search', async (req, res) => {
      await parcoursController.getParcoursByKeywords(req, res);
    });

    app.post('/parcours', async (req, res) => {
      await parcoursController.addParcours(req, res);
    });

    app.patch('/parcours/:id', async (req, res) => {
      await parcoursController.updateParcours(req, res);
    });

    app.get('/parcours/pdf/:id', async (req, res) => {
      await parcoursController.getParcoursPdf(req, res);
    });
  }
}
