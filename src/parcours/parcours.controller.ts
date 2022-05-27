import { Request, Response } from 'express';

import { ParcoursService } from './parcours.service';

export class ParcoursController {
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
