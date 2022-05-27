import { Request, Response } from 'express';

export interface ParcoursControllerInterface {
  getAllParcours(req: Request, res: Response): Promise<void>;
  addParcours(req: Request, res: Response): Promise<void>;
}
