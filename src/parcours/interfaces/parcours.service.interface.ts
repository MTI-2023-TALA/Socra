import { CreateParcoursDto } from '../../dto/create-parcours.dto';
import { ParcoursDto } from '../../dto/parcours.dto';
import { UpdateParcoursDto } from '../../dto/update-parcours.dto';
import { UpdateResult } from 'mongodb';

export interface ParcoursServiceInterface {
  getAllParcours(): Promise<ParcoursDto[]>;
  getParcoursById(id: string): Promise<ParcoursDto | null>;
  getParcoursByKeywords(keywords: string[]): Promise<ParcoursDto[]>;
  addParcours(createParcoursDto: CreateParcoursDto): Promise<ParcoursDto>;
  updateParcours(id: string, updateParcoursDto: UpdateParcoursDto): Promise<UpdateResult>;
}
