import { Request, Response } from 'express';

import { parcoursCollection } from '../mongo';

export class ParcoursController {
  public async getAllParcours(req: Request, res: Response): Promise<void> {
    const parcours = await parcoursCollection.find({}).toArray();
    res.send(parcours);
  }

  public async AddParcours(req: Request, res: Response): Promise<void> {
    const insertResult = await parcoursCollection.insertOne(req.body);
    res.send(insertResult);
  }
}
