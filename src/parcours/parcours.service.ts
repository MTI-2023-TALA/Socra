import * as fs from 'fs';

import { Document, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../dto/create-parcours.dto';
import { KeywordSearcher } from '../keyword-search/keyword-search';
import PDFDocument from 'pdfkit';
import { ParcoursDto } from '../dto/parcours.dto';
import { ParcoursRepositoryInterface } from './interfaces/parcours.repository.interface';
import { ParcoursServiceInterface } from './interfaces/parcours.service.interface';
import { UpdateParcoursDto } from '../dto/update-parcours.dto';

export class ParcoursService implements ParcoursServiceInterface {
  constructor(private readonly parcoursRepository: ParcoursRepositoryInterface) {}
  public async getParcoursCheaperThan(price: number): Promise<ParcoursDto[]> {
    const parcours = await this.parcoursRepository.getParcoursCheaperThan(price);
    return parcours.map((parcour: WithId<Document>) => this.mapDocumentToParcoursDto(parcour));
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

  public async getParcoursPdf(id: string, doc: typeof PDFDocument): Promise<void | null> {
    const parcours = await this.parcoursRepository.getParcoursById(id);
    if (!parcours) {
      return null;
    }
    await this.generateParcoursPdf(parcours, doc);
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

  private async generateParcoursPdf(parcours: WithId<Document>, doc: typeof PDFDocument): Promise<void> {
    const createdDoc = fs.createWriteStream(`./pdf/${parcours._id}.pdf`, { flags: 'w' });
    console.log('creating pdf...');
    doc.pipe(createdDoc);

    let line = 80;
    const charPerLine = 80;

    doc.text(`${parcours.title}`, 100, line);
    line += 30;

    doc.text(`${parcours.description}`, 100, line);
    const linesOfDesc = Math.floor(parcours.description.length / charPerLine);
    line += 20 * (linesOfDesc + 1);

    doc.text(`Localisation : ${parcours.campus}, durée en mois : ${parcours.durationInMonths}`, 100, line);
    line += 20;
    doc.text(`Diplôme : ${parcours.type}`, 100, line);
    line += 20;
    doc.text(`Prix : ${parcours.price}€`, 100, line);
    line += 20;
    doc.text(`Pourcentage de temps en présentiel : ${parcours.onSitePercentage}%`, 100, line);
    line += 20;
    doc.text(`Date de début : ${new Date(parcours.beginDate).toLocaleDateString('fr')}`, 100, line);
    line += 30;

    doc.text(`Modules :`, 100, line);
    line += 30;

    for (const module of parcours.modules) {
      doc.text(`${module.title}`, 100, line);
      line += 20;
      doc.text(`${module.description}`, 100, line);
      const descLines = Math.floor(module.description.length / charPerLine);
      line += 30 * (descLines + 1);
    }

    doc.end();

    console.log('PDF generated');
  }
}
