import { Request, Response } from 'express';

import { ParcoursControllerInterface } from './interfaces/parcours.controller.interface';
import { ParcoursService } from './parcours.service';

export class ParcoursController implements ParcoursControllerInterface {
  constructor(private readonly parcoursService: ParcoursService) {}

  public async getAllParcours(req: Request, res: Response): Promise<void> {
    const parcours = await this.parcoursService.getAllParcours();
    res.send(parcours);
  }

  public async addParcours(req: Request, res: Response): Promise<void> {
    const insertResult = await this.parcoursService.addParcours(req.body);
    res.send(insertResult);
  }
}
