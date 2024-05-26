import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropuestaService],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
