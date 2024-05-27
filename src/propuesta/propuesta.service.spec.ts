import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { es, faker } from '@faker-js/faker';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;
  let propuestaList: PropuestaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropuestaService],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.delete({});
    await proyectoRepository.delete({});
    propuestaList = [];
    for (let i = 0; i < 5; i++) {
      const propuesta: PropuestaEntity = await repository.save({
        titulo: faker.lorem.sentence(),
        descripcion: faker.lorem.paragraph(),
        palabra: faker.lorem.word(),
        profesor: null,
        proyecto: null
      });
      propuestaList.push(propuesta);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Crear deberia deberia retornar una nueva propuesta', async () => {
    const propuesta: PropuestaEntity = {
      id: 0,
      titulo: faker.lorem.sentence(),
      descripcion: faker.lorem.paragraph(),
      palabra: faker.lorem.word(),
      profesor: null,
      proyecto: null
    };
    const resultado = await service.create(propuesta);
    expect(resultado).toEqual(expect.objectContaining(propuesta));
  });

  it('Crear deberia lanzar error por tener el titulo vacío', async () => {
    const propuesta: PropuestaEntity = {
      id: 0,
      titulo: null,
      descripcion: faker.lorem.paragraph(),
      palabra: faker.lorem.word(),
      profesor: null,
      proyecto: null
    };
    await expect(service.create(propuesta)).rejects.toHaveProperty(
      'message',
      'La propuesta no se puede crear por tener un titulo vacio'
    );
  });

  it('Encontrar por id deberia retornar una propuesta', async () => {
    const propuestaGuardada: PropuestaEntity = propuestaList[0];
    const resultado = await service.findOne(propuestaGuardada.id);
    expect(resultado).toEqual(propuestaGuardada);
  });

  it('Encontrar por id no deberia retornar una propuesta', async () => {
    await expect(service.findOne(0)).rejects.toHaveProperty(
      'message',
      'La propuesta con el id dado no fue encontrada'
    );
  });

  it('Eliminar deberia encontrar la propuesta y eliminarla por id', async () => {
    const propuestaGuardada: PropuestaEntity = propuestaList[0];
    const resultado = await service.delete(propuestaGuardada.id);
    expect(resultado).toBeUndefined();

    const propuestaEliminada = await service.findOne(propuestaGuardada.id);
    expect(propuestaEliminada).toBeNull();
  });
});
