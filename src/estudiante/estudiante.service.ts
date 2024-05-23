import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ) { }

    async create(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (estudiante.codigo.length != 10) {
            throw new BusinessLogicException('El codigo debe tener 10 caracteres', BusinessError.PRECONDITION_FAILED);
        }

        return await this.estudianteRepository.save(estudiante);
    }

    async findOne(id: number): Promise<EstudianteEntity> {
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where: {id}, relations: ["proyecto"] } );
        if (!estudiante)
          throw new BusinessLogicException("El estudiante con la id dada no fue encontrado", BusinessError.NOT_FOUND);
    
        return estudiante;
    }
}
