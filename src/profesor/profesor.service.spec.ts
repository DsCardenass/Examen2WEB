import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { es, faker } from '@faker-js/faker';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let propuestaRepository: Repository<PropuestaEntity>;
  let profesorList: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    propuestaRepository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.delete({});
    await propuestaRepository.delete({});
    profesorList = [];
    for (let i = 0; i < 5; i++) {
      const profesor: ProfesorEntity = await repository.save({
        cedula: faker.datatype.number(),
        nombre: faker.name.firstName(),
        grupoInv: faker.helpers.arrayElement(['TICSW', 'IMAGINE', 'COMIT']),
        extension: faker.datatype.number(),
        propuestas: null
      });
      profesorList.push(profesor);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Crear deberia deberia retornar un nuevo profesor', async () => {
    const profesor: ProfesorEntity = {
      id: 0,
      cedula: faker.datatype.number(),
      nombre: faker.name.firstName(),
      grupoInv: 'IMAGINE',
      extension: faker.datatype.number(),
      propuestas: [],
    };
    const resultado = await service.create(profesor);
    expect(resultado).toEqual(expect.objectContaining(profesor));
  });

  it('Crear deberia lanzar error por tener un grupo inv inválido', async () => {
    const profesor: ProfesorEntity = {
      id: 0,
      cedula: faker.datatype.number(),
      nombre: faker.name.firstName(),
      grupoInv: 'IP',
      extension: faker.datatype.number(),
      propuestas: [],
    };
    await expect(service.create(profesor)).rejects.toHaveProperty(
      'message',
      'El grupo de investigación no se encuentra entre los valores válidos'
    );
  });

  it('Encontrar por id deberia retornar un profesor', async () => {
    const profesorGuardado: ProfesorEntity = profesorList[0];
    const resultado = await service.findById(profesorGuardado.id);
    expect(resultado).toEqual(profesorGuardado);
  });

  it('Encontrar por id no deberia retornar un profesor', async () => {
    await expect(service.findById(0)).rejects.toHaveProperty(
      'message',
      'El profesor con la ID dada no fue encontrado'
    );
  });


  it('Eliminar deberia encontrar al profesor y eliminarlo por id', async () => {
    const profesorGuardado: ProfesorEntity = profesorList[0];
    const resultado = await service.deleteById(profesorGuardado.id);
    expect(resultado).toBeUndefined();

    const profesorEliminado = await service.findById(profesorGuardado.id);
    expect(profesorEliminado).toBeNull();
  });

  it('Eliminar deberia encontrar al profesor y eliminarlo por cedula', async () => {
    const profesorGuardado: ProfesorEntity = profesorList[0];
    const resultado = await service.deleteByCed(profesorGuardado.cedula);
    expect(resultado).toBeUndefined();

    //Sin comprobar si lo encuentra porque no existe FindByCed
  });
});
