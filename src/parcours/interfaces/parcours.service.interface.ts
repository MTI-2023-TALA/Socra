import { Document, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../../dto/create-parcours.dto';
import { ParcoursDto } from '../../dto/parcours.dto';
import { UpdateParcoursDto } from '../../dto/update-parcours.dto';

export interface ParcoursServiceInterface {
  getAllParcours(): Promise<WithId<Document>[]>;
  getParcoursById(id: string): Promise<WithId<Document> | null>;
  addParcours(createParcoursDto: CreateParcoursDto): Promise<ParcoursDto>;
  updateParcours(id: string, updateParcoursDto: UpdateParcoursDto): Promise<UpdateResult>;
}
