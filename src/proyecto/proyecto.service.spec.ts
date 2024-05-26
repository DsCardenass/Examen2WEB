import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;
  let proyectoList: ProyectoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.delete({});
    proyectoList = [];
    for (let i = 0; i < 5; i++) {
      const proyecto: ProyectoEntity = await repository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        url: faker.internet.url(),
        propuesta: null,
        estudiante:null,
      });
      proyectoList.push(proyecto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Crear deberia retornar un nuevo proyecto', async () => {
    const Proyecto: ProyectoEntity = {
      id: 0,
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      propuesta: null,
      estudiante: null,
      url: faker.internet.url()
    };

    const nuevoProyecto: ProyectoEntity = await service.create(Proyecto);
    expect(nuevoProyecto).not.toBeNull();
    const proyectoGuardado: ProyectoEntity = await repository.findOne({ where: { id: nuevoProyecto.id } });
    expect(nuevoProyecto).not.toBeNull();
    expect(proyectoGuardado.fechaInicio).toEqual(nuevoProyecto.fechaInicio);
    expect(proyectoGuardado.fechaFin).toEqual(nuevoProyecto.fechaFin);
    expect(proyectoGuardado.url).toEqual(nuevoProyecto.url);
    expect(proyectoGuardado.propuesta).toBeNull();
    expect(proyectoGuardado.estudiante).toBeNull();
  });

  it('Crear deberia lanzar error por la fecha de inicio mayor a fin', async () => {
    const Proyecto: ProyectoEntity = {
      id: 0,
      fechaInicio: faker.date.future(),
      fechaFin: faker.date.past(),
      propuesta: null,
      estudiante: null,
      url: faker.internet.url()
    };
    await expect(service.create(Proyecto)).rejects.toHaveProperty(
      'message',
      'El proyecto tiene una fecha de inicio mayor a la de fin'
    );
  });

});
