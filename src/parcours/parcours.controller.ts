import { Request, Response } from 'express';

import { ParamsDictionary } from 'express-serve-static-core';
import { ParcoursControllerInterface } from './interfaces/parcours.controller.interface';
import { ParcoursServiceInterface } from './interfaces/parcours.service.interface';
import { ParsedQs } from 'qs';

export class ParcoursController implements ParcoursControllerInterface {
  constructor(private readonly parcoursService: ParcoursServiceInterface) {}

  public async getParcoursByKeywords(req: Request, res: Response): Promise<void> {
    const parcours = await this.parcoursService.getParcoursByKeywords(req.body);
    res.send(parcours);
  }
  getParcoursPdf(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async getAllParcours(req: Request, res: Response): Promise<void> {
    const parcours = await this.parcoursService.getAllParcours();
    res.send(parcours);
  }

  public async getParcoursById(req: Request, res: Response): Promise<void> {
    const parcours = await this.parcoursService.getParcoursById(req.params.id);
    if (!parcours) {
      res.status(404).send('Parcours not found');
      return;
    }
    res.send(parcours);
  }

  public async addParcours(req: Request, res: Response): Promise<void> {
    // TODO: verify what is sent in body and if attributes are correct
    const insertResult = await this.parcoursService.addParcours(req.body);
    res.send(insertResult);
  }

  public async updateParcours(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const updatedParcours = await this.parcoursService.updateParcours(id, req.body);
    res.send(updatedParcours);
  }
}
