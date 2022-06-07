import { Request, Response } from 'express';

import { ParcoursControllerInterface } from './interfaces/parcours.controller.interface';
import { ParcoursServiceInterface } from './interfaces/parcours.service.interface';

export class ParcoursController implements ParcoursControllerInterface {
  constructor(private readonly parcoursService: ParcoursServiceInterface) {}

  public async getAllParcours(req: Request, res: Response): Promise<void> {
    const parcours = await this.parcoursService.getAllParcours();
    res.send(parcours);
  }

  public async getParcoursById(req: Request, res: Response): Promise<void> {
    const parcours = await this.parcoursService.getParcoursById(req.params.id);
    if (!parcours) {
      res.status(404).send('Parcours not found');
    }
    res.send(parcours);
  }

  public async addParcours(req: Request, res: Response): Promise<void> {
    // TODO: verify what is sent in body and if attributes are correct
    const insertResult = await this.parcoursService.addParcours(req.body);
    res.send(insertResult);
  }

  public async updateParcours(id: string, req: Request, res: Response): Promise<void> {
    const updatedParcours = await this.parcoursService.updateParcours(id, req.body);
    res.send(updatedParcours);
  }
}
