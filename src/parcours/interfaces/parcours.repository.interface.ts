import { Document, WithId } from 'mongodb';

import { CreateParcoursDto } from '../../dto/create-parcours.dto';
import { ParcoursDto } from '../../dto/parcours.dto';

export interface ParcoursRepositoryInterface {
  getAllParcours(): Promise<WithId<Document>[]>;
  addParcours(createParcoursDto: CreateParcoursDto): Promise<ParcoursDto>;
}
