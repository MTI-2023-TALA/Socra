import { Request, Response } from 'express';

import PDFDocument from 'pdfkit';
import { ParcoursControllerInterface } from './interfaces/parcours.controller.interface';
import { ParcoursServiceInterface } from './interfaces/parcours.service.interface';

export class ParcoursController implements ParcoursControllerInterface {
  constructor(private readonly parcoursService: ParcoursServiceInterface) {}

  public async getParcoursCheaperThan(req: Request, res: Response): Promise<void> {
    const parcours = await this.parcoursService.getParcoursCheaperThan(+req.params.price);
  }

  public async getParcoursWithCity(req: Request, res: Response): Promise<void> {
    const parcours = await this.parcoursService.getParcoursWithCity(req.params.city);
    res.send(parcours);
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

  public async getParcoursByKeywords(req: Request, res: Response): Promise<void> {
    const parcours = await this.parcoursService.getParcoursByKeywords(req.body);
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

  public async getParcoursPdf(req: Request, res: Response): Promise<void> {
    const doc = new PDFDocument({ bufferPages: true });

    const buffers: any[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData as ArrayBuffer),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=test.pdf',
        })
        .end(pdfData);
    });
    await this.parcoursService.getParcoursPdf(req.params.id, doc);
  }
}
