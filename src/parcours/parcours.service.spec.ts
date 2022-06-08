import { Document, InsertOneResult, ObjectId, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../dto/create-parcours.dto';
import { ParcoursRepositoryInterface } from './interfaces/parcours.repository.interface';
import { ParcoursService } from './parcours.service';
import { UpdateParcoursDto } from '../dto/update-parcours.dto';

class ParcoursRepositoryMock implements ParcoursRepositoryInterface {
  parcours: WithId<Document>[] = [
    {
      _id: new ObjectId('4edd40c86762e0fb12000003'),
      title: 'Génie Logiciel',
      createdAt: new Date('2020-01-01T00:00:00.000Z'),
      campus: 'Paris',
      durationInMonths: 24,
      type: 'Master',
      price: 12000,
      onSitePercentage: 50,
      beginDate: '2023-02-25',
      modules: [
        {
          title: `Systèmes d'information`,
          description: `Autour de la gestion d'information`,
        },
        {
          titre: 'ERP',
          description: 'Préparation Certification SAP',
        },
      ],
      description:
        'Un master dédié à l’étude des systèmes d’information ainsi que leur implémentation dans les entreprises',
    },
    {
      _id: new ObjectId('4edd40c86762e0fb12000004'),
      createdAt: new Date('2020-01-01T00:00:00.000Z'),
      title: 'Agronomie',
      campus: 'Strasbourg',
      durationInMonths: 24,
      type: 'DUT',
      price: 1000,
      onSitePercentage: 100,
      beginDate: '2023-01-01',
      modules: [
        {
          title: 'Trait des vaches',
          description: 'Apprentissage: Comment traire une vache comme un pro',
        },
        {
          titre: 'FOURCHE',
          description: 'Apprentissage: Combat à la fourche',
        },
      ],
      description: 'Un master dédié à devenir un bon agriculteur!',
    },
  ];

  async getAllParcours(): Promise<WithId<Document>[]> {
    return this.parcours;
  }

  async getParcoursById(id: string): Promise<WithId<Document> | null> {
    const p = this.parcours.find((parcours) => parcours._id.toString() === id);
    if (p === undefined) {
      return null;
    }
    return p;
  }

  async addParcours(createParcoursDto: CreateParcoursDto): Promise<InsertOneResult> {
    throw new Error('Method not implemented.');
  }

  async updateParcours(id: string, updateParcoursDto: UpdateParcoursDto): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
}

describe('ParcoursService', () => {
  let service: ParcoursService;
  let repository: ParcoursRepositoryMock;

  beforeEach(() => {
    repository = new ParcoursRepositoryMock();
    service = new ParcoursService(repository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should call getAllParcours', async () => {
    const getAllParcours = jest.spyOn(repository, 'getAllParcours');

    const res = await service.getAllParcours();
    expect(res).toMatchSnapshot();
    expect(getAllParcours).toHaveBeenCalledTimes(1);
  });

  it('should call getParcoursById', async () => {
    const getParcoursById = jest.spyOn(repository, 'getParcoursById');

    const res = await service.getParcoursById('4edd40c86762e0fb12000003');
    expect(res).toMatchSnapshot();
    expect(getParcoursById).toHaveBeenCalledTimes(1);
  });

  it('should fail to retrieve one parcours by non-existing id', async () => {
    const getParcoursById = jest.spyOn(repository, 'getParcoursById');

    const res = await service.getParcoursById('4edd40c86762e0fb12000005');
    expect(res).toBeNull();
    expect(getParcoursById).toHaveBeenCalledTimes(1);
  });
});
