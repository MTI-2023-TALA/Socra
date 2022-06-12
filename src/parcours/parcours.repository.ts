import { Document, InsertOneResult, ObjectId, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../dto/create-parcours.dto';
import { ParcoursRepositoryInterface } from './interfaces/parcours.repository.interface';
import { UpdateParcoursDto } from '../dto/update-parcours.dto';
import { parcoursCollection } from '../mongo';

export class ParcoursRepository implements ParcoursRepositoryInterface {
  public async getParcoursWithCity(city: string): Promise<WithId<Document>[]> {
    const regex = new RegExp(['^', city, '$'].join(''), 'i');
    return await parcoursCollection.find({ campus: regex }).toArray();
  }

  public async getAllParcours(): Promise<WithId<Document>[]> {
    return await parcoursCollection.find({}).sort({ createdAt: -1 }).toArray();
  }

  public async getParcoursById(id: string): Promise<WithId<Document> | null> {
    return parcoursCollection.findOne({ _id: new ObjectId(id) });
  }

  public async getParcoursByKeywords(keywords: string[]): Promise<WithId<Document>[]> {
    return parcoursCollection.find({ $text: { $search: keywords.join(' ') } }).toArray();
  }

  public async addParcours(createParcoursDto: CreateParcoursDto): Promise<InsertOneResult> {
    const createdAt = new Date(Date.now());
    return await parcoursCollection.insertOne({ ...createParcoursDto, createdAt });
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
