import { Injectable } from '@nestjs/common';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ) { }

    async create(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        if (propuesta.titulo == null)
            throw new BusinessLogicException("El titulo de la propuesta no puede ser vacio", BusinessError.PRECONDITION_FAILED);
        return await this.propuestaRepository.save(propuesta);
    }

    async findOne(id: number): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({ where: { id }, relations: ["profesor", "proyecto"] });
        if (!propuesta)
            throw new BusinessLogicException("La propuesta con el id dado no se encontró", BusinessError.NOT_FOUND);

        return propuesta;
    }

    async findAll(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({ relations: ["profesor", "proyecto"] });
    }

    async delete(id: number) {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({ where: { id } });
        if (!propuesta)
            throw new BusinessLogicException("La propuesta con el id dado no se encontró", BusinessError.NOT_FOUND);;

        await this.propuestaRepository.remove(propuesta);
    }
}
