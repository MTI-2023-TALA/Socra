import { Document, InsertOneResult, ObjectId, UpdateResult, WithId } from 'mongodb';

import { CreateParcoursDto } from '../dto/create-parcours.dto';
import { ParcoursRepositoryInterface } from './interfaces/parcours.repository.interface';
import { ParcoursService } from './parcours.service';
import { UpdateParcoursDto } from '../dto/update-parcours.dto';

const newParocurs: CreateParcoursDto = {
  title: 'STAPS',
  campus: 'Toulouse',
  durationInMonths: 24,
  type: 'Master',
  price: 0,
  onSitePercentage: 100,
  beginDate: new Date('2023-03-05'),
  modules: [
    {
      title: 'Badminton',
      description: 'Cours de Badminton',
    },
    {
      title: 'Tennis',
      description: 'Cours de tennis',
    },
    {
      title: "Coach Sportif 1'O'1",
      description: 'Comment devenir un bon coach sportif',
    },
    {
      title: 'Management',
      description: 'Bases du management',
    },
  ],
  description: 'Master pour devenir Coach sportif ou athlète de haut-niveau',
};

class ParcoursRepositoryMock implements ParcoursRepositoryInterface {
  parcours: WithId<Document>[] = [
    {
      _id: new ObjectId('4edd40c86762e0fb12000000'),
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
      _id: new ObjectId('4edd40c86762e0fb12000001'),
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

  async getParcoursWithCity(city: string): Promise<WithId<Document>[]> {
    const p = this.parcours.filter((parcours) => parcours.campus.toString().toLowerCase() === city.toLowerCase());
    return p;
  }

  async addParcours(createParcoursDto: CreateParcoursDto): Promise<InsertOneResult> {
    this.parcours.push({
      _id: new ObjectId('4edd40c86762e0fb1200000' + this.parcours.length),
      createParcoursDto,
      createdAt: new Date(Date.now()),
    });

    return { acknowledged: true, insertedId: this.parcours[this.parcours.length - 1]._id };
  }

  async updateParcours(id: string, updateParcoursDto: UpdateParcoursDto): Promise<UpdateResult> {
    const p = this.parcours.find((parcours) => parcours._id.toString() === id);
    if (!p) {
      throw new Error('Parcours not found');
    }

    p.description = updateParcoursDto.description;

    return {
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedId: p._id,
      upsertedCount: 1,
    };
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

  it('should call getParcoursByKeywords', async () => {
    const getParcoursByKeywords = jest.spyOn(repository, 'getAllParcours');

    const res = await service.getParcoursByKeywords([]);
    expect(res).toMatchSnapshot();
    expect(getParcoursByKeywords).toHaveBeenCalledTimes(1);
  });

  it('should fail to retrieve one parcours by non-existing id', async () => {
    const getParcoursById = jest.spyOn(repository, 'getParcoursById');

    const res = await service.getParcoursById('4edd40c86762e0fb12000005');
    expect(res).toBeNull();
    expect(getParcoursById).toHaveBeenCalledTimes(1);
  });

  it('should be able to add new parcours', async () => {
    const addParcours = jest.spyOn(repository, 'addParcours');
    const res = (await service.addParcours(newParocurs)) as any;

    delete res.createdAt;
    expect(res).toMatchSnapshot();
    expect(addParcours).toBeCalledTimes(1);
  });

  it('should be able to getAllParcours when you have added one parcours', async () => {
    const getAllParcours = jest.spyOn(repository, 'getAllParcours');
    await service.addParcours(newParocurs);

    const res = await service.getAllParcours();
    expect(getAllParcours).toBeCalledTimes(1);
    expect(res).toHaveLength(3);
  });

  it('Should be able to update Description of a parours', async () => {
    const updateParcours = jest.spyOn(repository, 'updateParcours');

    await service.updateParcours('4edd40c86762e0fb12000000', {
      description: 'Bonjour',
    });

    expect((await service.getAllParcours())[0].description).toEqual('Bonjour');
    expect(updateParcours).toBeCalledTimes(1);
  });

  it('Should be able to sort by keywords', async () => {
    const updateParcours = jest.spyOn(repository, 'getAllParcours');

    expect((await service.getParcoursByKeywords(['agriculteur']))[0].title).toEqual('Agronomie');
    expect(updateParcours).toBeCalledTimes(1);
  });

  it('Should be able to get with city', async () => {
    const updateParcours = jest.spyOn(repository, 'getParcoursWithCity');

    expect((await service.getParcoursWithCity('StRaSbOuRg'))[0].title).toEqual('Agronomie');
    expect(updateParcours).toBeCalledTimes(1);
  });
});
