import { Document, WithId } from 'mongodb';

import { CreateParcoursDto } from '../dto/create-parcours.dto';
import { ParcoursDto } from '../dto/parcours.dto';
import { ParcoursRepositoryInterface } from './interfaces/parcours.repository.interface';
import { parcoursCollection } from '../mongo';

export class ParcoursRepository implements ParcoursRepositoryInterface {
  public async getAllParcours(): Promise<WithId<Document>[]> {
    return parcoursCollection.find({}).toArray();
  }

  public async addParcours(createParcoursDto: CreateParcoursDto): Promise<ParcoursDto> {
    const insertResult = await parcoursCollection.insertOne(createParcoursDto);
    return {
      id: insertResult.insertedId.toString(),
      ...createParcoursDto,
    };
  }
}
