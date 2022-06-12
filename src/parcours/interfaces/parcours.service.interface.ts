import { CreateParcoursDto } from '../../dto/create-parcours.dto';
import PDFDocument from 'pdfkit';
import { ParcoursDto } from '../../dto/parcours.dto';
import { UpdateParcoursDto } from '../../dto/update-parcours.dto';
import { UpdateResult } from 'mongodb';

export interface ParcoursServiceInterface {
  getAllParcours(): Promise<ParcoursDto[]>;
  getParcoursById(id: string): Promise<ParcoursDto | null>;
  getParcoursByKeywords(keywords: string[]): Promise<ParcoursDto[]>;
  getParcoursCheaperThan(price: number): Promise<ParcoursDto[]>;
  getParcoursWithCity(city: string): Promise<ParcoursDto[]>;
  addParcours(createParcoursDto: CreateParcoursDto): Promise<ParcoursDto>;
  updateParcours(id: string, updateParcoursDto: UpdateParcoursDto): Promise<UpdateResult>;
  getParcoursPdf(id: string, doc: typeof PDFDocument): Promise<void | null>;
}
