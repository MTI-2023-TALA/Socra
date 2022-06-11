import { Document, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../dto/create-parcours.dto';
import { KeywordSearcher } from '../keyword-search/keyword-search';
import { ParcoursDto } from '../dto/parcours.dto';
import { ParcoursRepositoryInterface } from './interfaces/parcours.repository.interface';
import { ParcoursServiceInterface } from './interfaces/parcours.service.interface';
import { UpdateParcoursDto } from '../dto/update-parcours.dto';

export class ParcoursService implements ParcoursServiceInterface {
  constructor(private readonly parcoursRepository: ParcoursRepositoryInterface) {}
  public async getParcoursCheaperThan(price: number): Promise<ParcoursDto[]> {
    const parcours = await this.parcoursRepository.getParcoursCheaperThan(price);
    return parcours.map((parcour: WithId<Document>) => this.mapDocumentToParcourDto(parcour));
  }

  public async getParcoursByKeywords(keywords: string[]): Promise<ParcoursDto[]> {
    const parcours = await this.parcoursRepository.getAllParcours();
    const keywordSearcher = new KeywordSearcher();
    parcours.sort((a, b) => {
      const scoreA = keywordSearcher.getScore(keywords, a['description']);
      const scoreB = keywordSearcher.getScore(keywords, b['description']);
      if (scoreA > scoreB) return -1;
      return 1;
    });
    return parcours.map((parcour: WithId<Document>) => this.mapDocumentToParcourDto(parcour));
  }

  public async getAllParcours(): Promise<ParcoursDto[]> {
    const parcours = await this.parcoursRepository.getAllParcours();
    return parcours.map((parcour: WithId<Document>) => this.mapDocumentToParcourDto(parcour));
  }

  public async getParcoursById(id: string): Promise<ParcoursDto | null> {
    const parcour = await this.parcoursRepository.getParcoursById(id);
    if (!parcour) {
      return null;
    }

    return this.mapDocumentToParcourDto(parcour);
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

  private mapDocumentToParcourDto(parcour: WithId<Document>): ParcoursDto {
    return {
      id: parcour._id.toString(),
      createdAt: new Date(parcour.createdAt),
      title: parcour.title,
      campus: parcour.campus,
      durationInMonths: parcour.durationInMonths,
      type: parcour.type,
      price: parcour.price,
      onSitePercentage: parcour.onSitePercentage,
      beginDate: new Date(parcour.beginDate),
      modules: parcour.modules,
      description: parcour.description,
    };
  }
}
