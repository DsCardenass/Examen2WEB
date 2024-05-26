import { Injectable } from '@nestjs/common';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ) { }

    async create(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if (proyecto.fechaInicio >= proyecto.fechaFin)
            throw new BusinessLogicException("La fecha de inicio no puede ser despues de la final", BusinessError.NOT_FOUND);

        return await this.proyectoRepository.save(proyecto);
    }
}
