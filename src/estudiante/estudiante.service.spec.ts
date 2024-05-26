import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { es, faker } from '@faker-js/faker';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudianteList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.delete({});
    estudianteList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante: EstudianteEntity = await repository.save({
        nombre: faker.person.fullName(),
        codigo: faker.string.sample(10),
        creditos: faker.number.int({ min: 1, max: 200 }),
        propuesta: null,
      });
      estudianteList.push(estudiante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Crear deberia retornar un nuevo estudiante', async () => {
    const Estudiante: EstudianteEntity = {
      id: 0,
      nombre: faker.name.firstName(),
      codigo: faker.random.alphaNumeric(10),
      creditos: faker.datatype.number(),
      proyecto: null
    };

    const newStudent: EstudianteEntity = await service.create(Estudiante);
    expect(newStudent).not.toBeNull();
    const storedStudent: EstudianteEntity = await repository.findOne({ where: { id: newStudent.id } });
    expect(storedStudent).not.toBeNull();
    expect(storedStudent.nombre).toEqual(newStudent.nombre);
    expect(storedStudent.codigo).toEqual(newStudent.codigo);
    expect(storedStudent.creditos).toEqual(newStudent.creditos);
    expect(storedStudent.proyecto).toBeNull();
  });

  it('Crear deberia lanzar error por el codigo de estudiante', async () => {
    const Estudiante: EstudianteEntity = {
      id: 0,
      nombre: faker.name.firstName(),
      codigo: faker.random.alphaNumeric(5),
      creditos: faker.datatype.number(),
      proyecto: null
    };
    await expect(service.create(Estudiante)).rejects.toHaveProperty(
      'message',
      'El estudiante tiene un codigo diferente de 10 caracteres'
    );
  });

  it('Encontrar deberia retornar un estudiante por su ID', async () => {
    const estudianteGuardado: EstudianteEntity = estudianteList[0];
    const estudiante: EstudianteEntity = await service.findOne(estudianteGuardado.id);
    expect(estudiante).not.toBeNull();
    expect(estudiante.nombre).toEqual(estudianteGuardado.nombre);
    expect(estudiante.codigo).toEqual(estudianteGuardado.codigo);
    expect(estudiante.creditos).toEqual(estudianteGuardado.creditos);
    expect(estudiante.proyecto).toEqual(estudianteGuardado.proyecto);
});

  it('Encontrar por su id deberia no encontrarlo', async () => {
    await expect(service.findOne(0)).rejects.toHaveProperty(
      'message',
      'Estudiante con el id no encontrado'
    );
  });
});


