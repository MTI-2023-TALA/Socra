import { Document, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../dto/create-parcours.dto';
import { ParcoursDto } from '../dto/parcours.dto';
import { ParcoursRepository } from './parcours.repository';
import { ParcoursServiceInterface } from './interfaces/parcours.service.interface';
import { UpdateParcoursDto } from '../dto/update-parcours.dto';

export class ParcoursService implements ParcoursServiceInterface {
  constructor(private readonly parcoursRepository: ParcoursRepository) {}

  public async getAllParcours(): Promise<WithId<Document>[]> {
    return this.parcoursRepository.getAllParcours();
  }

  public async addParcours(createParcoursDto: CreateParcoursDto): Promise<ParcoursDto> {
    return this.parcoursRepository.addParcours(createParcoursDto);
  }

  public async updateParcours(id: string, updateParcoursDto: UpdateParcoursDto): Promise<UpdateResult> {
    return this.parcoursRepository.updateParcours(id, updateParcoursDto);
  }
}
