import { Document, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../dto/create-parcours.dto';
import { KeywordSearcher } from '../keyword-search/keyword-search';
import { ParcoursDto } from '../dto/parcours.dto';
import { ParcoursRepositoryInterface } from './interfaces/parcours.repository.interface';
import { ParcoursServiceInterface } from './interfaces/parcours.service.interface';
import { UpdateParcoursDto } from '../dto/update-parcours.dto';

export class ParcoursService implements ParcoursServiceInterface {
  constructor(private readonly parcoursRepository: ParcoursRepositoryInterface) {}

  public async getParcoursWithCity(city: string): Promise<ParcoursDto[]> {
    const parcours = await this.parcoursRepository.getParcoursWithCity(city);
    return parcours.map((parcour: WithId<Document>) => this.mapDocumentToParcourDto(parcour));
  }

  public async getAllParcours(): Promise<ParcoursDto[]> {
    const parcoursList = await this.parcoursRepository.getAllParcours();
    return parcoursList.map((parcours: WithId<Document>) => this.mapDocumentToParcoursDto(parcours));
  }

  public async getParcoursById(id: string): Promise<ParcoursDto | null> {
    const parcours = await this.parcoursRepository.getParcoursById(id);
    if (!parcours) {
      return null;
    }
    return this.mapDocumentToParcoursDto(parcours);
  }

  public async getParcoursByKeywords(keywords: string[]): Promise<ParcoursDto[]> {
    const parcoursList = await this.parcoursRepository.getParcoursByKeywords(keywords);
    const keywordSearcher = new KeywordSearcher();
    parcoursList.sort((a, b) => {
      const scoreA = keywordSearcher.getScore(keywords, a['description']);
      const scoreB = keywordSearcher.getScore(keywords, b['description']);
      if (scoreA > scoreB) return -1;
      return 1;
    });
    return parcoursList.map((parcours: WithId<Document>) => this.mapDocumentToParcoursDto(parcours));
  }

  public async addParcours(createParcoursDto: CreateParcoursDto): Promise<ParcoursDto> {
    const insertResult = await this.parcoursRepository.addParcours(createParcoursDto);
    return {
      id: insertResult.insertedId.toString(),
      createdAt: new Date(Date.now()),
      ...createParcoursDto,
    };
  }

  public async updateParcours(id: string, updateParcoursDto: UpdateParcoursDto): Promise<UpdateResult> {
    return this.parcoursRepository.updateParcours(id, updateParcoursDto);
  }

  private mapDocumentToParcoursDto(parcours: WithId<Document>): ParcoursDto {
    return {
      id: parcours._id.toString(),
      createdAt: new Date(parcours.createdAt),
      title: parcours.title,
      campus: parcours.campus,
      durationInMonths: parcours.durationInMonths,
      type: parcours.type,
      price: parcours.price,
      onSitePercentage: parcours.onSitePercentage,
      beginDate: new Date(parcours.beginDate),
      modules: parcours.modules,
      description: parcours.description,
    };
  }
}
