import { Injectable } from '@nestjs/common';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
const grupos_investigacion = ['TICSW', 'IMAGINE', 'COMIT'];

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ) { }

    async create(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        if (!grupos_investigacion.includes(profesor.grupoInv)) {
            throw new BusinessLogicException('Grupo de Investigación no válido', BusinessError.PRECONDITION_FAILED);
        }
        return await this.profesorRepository.save(profesor);
    }

    async findById(id: number): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({ where: { id }, relations: ["propuesta"] });
        if (!profesor)
            throw new BusinessLogicException("El profesor con la id dada no se encontró", BusinessError.NOT_FOUND);

        return profesor;
    }

    async deleteById(id: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({ where: { id } });
        if (!profesor)
            throw new BusinessLogicException("El profesor con la id dada no se encontró", BusinessError.NOT_FOUND);
        
        const propuestas = await this.propuestaRepository.find({ where: { profesor: { id: profesor.id } }, relations: ['proyecto'] });

        for (const propuesta of propuestas) {
            if (propuesta.proyecto != null) {
                throw new BusinessLogicException('El profesor tiene una propuesta con un proyecto existente', BusinessError.NOT_FOUND);
            }
        }

        await this.profesorRepository.remove(profesor);
    }

    async deleteByCed(cedula: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({ where: { cedula } });
        if (!profesor)
            throw new BusinessLogicException("El profesor con la cedula dada no se encontró", BusinessError.NOT_FOUND);

        const propuestas = await this.propuestaRepository.find({ where: { profesor: { id: profesor.id } }, relations: ['proyecto'] });

        for (const propuesta of propuestas) {
            if (propuesta.proyecto != null) {
                throw new BusinessLogicException('El profesor tiene una propuesta con un proyecto existente', BusinessError.NOT_FOUND);
            }
        }
        await this.profesorRepository.remove(profesor);
    }
}
