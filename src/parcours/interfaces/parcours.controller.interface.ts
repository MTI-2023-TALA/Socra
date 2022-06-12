import { Request, Response } from 'express';

export interface ParcoursControllerInterface {
  getAllParcours(req: Request, res: Response): Promise<void>;
  getParcoursById(req: Request, res: Response): Promise<void>;
  getParcoursByKeywords(req: Request, res: Response): Promise<void>;
  getParcoursWithCity(req: Request, res: Response): Promise<void>;
  addParcours(req: Request, res: Response): Promise<void>;
  updateParcours(req: Request, res: Response): Promise<void>;
  getParcoursPdf(req: Request, res: Response): Promise<void>;
}
