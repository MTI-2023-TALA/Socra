import { Document, ObjectId, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../dto/create-parcours.dto';
import { ParcoursDto } from '../dto/parcours.dto';
import { ParcoursRepositoryInterface } from './interfaces/parcours.repository.interface';
import { UpdateParcoursDto } from '../dto/update-parcours.dto';
import { parcoursCollection } from '../mongo';

export class ParcoursRepository implements ParcoursRepositoryInterface {
  public async getAllParcours(): Promise<WithId<Document>[]> {
    return await parcoursCollection.find({}).sort({ createdAt: -1 }).toArray();
  }

  public async addParcours(createParcoursDto: CreateParcoursDto): Promise<ParcoursDto> {
    const createdAt = new Date(Date.now());
    const insertResult = await parcoursCollection.insertOne({ ...createParcoursDto, createdAt });
    return {
      id: insertResult.insertedId.toString(),
      createdAt: createdAt,
      ...createParcoursDto,
    };
  }

  public async updateParcours(id: string, updateParcoursDto: UpdateParcoursDto): Promise<UpdateResult> {
    return await parcoursCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: updateParcoursDto }
    );
  }
}
