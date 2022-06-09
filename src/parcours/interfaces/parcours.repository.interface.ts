import { Document, InsertOneResult, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../../dto/create-parcours.dto';
import { UpdateParcoursDto } from '../../dto/update-parcours.dto';

export interface ParcoursRepositoryInterface {
  getAllParcours(): Promise<WithId<Document>[]>;
  getParcoursById(id: string): Promise<WithId<Document> | null>;
  getParcoursByKeywords(keywords: string[]): Promise<WithId<Document>[] | null>;
  addParcours(createParcoursDto: CreateParcoursDto): Promise<InsertOneResult>;
  updateParcours(id: string, updateParcoursDto: UpdateParcoursDto): Promise<UpdateResult>;
}
