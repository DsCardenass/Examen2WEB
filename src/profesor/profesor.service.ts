import { Injectable } from '@nestjs/common';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
const grupos_investigacion = ['TICSW', 'IMAGINE', 'COMIT'];

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ) { }

    async crearProfesor(cedula: number, nombre: string, grupoInv: string, extension: number): Promise<ProfesorEntity> {
        if (!grupos_investigacion.includes(grupoInv)) {
            throw new BusinessLogicException('Grupo de Investigación no válido', BusinessError.PRECONDITION_FAILED);
        }

        const profesor = this.profesorRepository.create({ cedula, nombre, grupoInv, extension });
        return this.profesorRepository.save(profesor);
    }

    async findById(id: number): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ["propuesta"] } );
        if (!profesor)
          throw new BusinessLogicException("El profesor con la id dada no se encontró", BusinessError.NOT_FOUND);
    
        return profesor;
    }
    
    async deleteById(id: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{id}});
        if (!profesor)
          throw new BusinessLogicException("El profesor con la id dada no se encontró", BusinessError.NOT_FOUND);
      
        await this.profesorRepository.remove(profesor);
    }

    async deleteByCed(cedula: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{cedula}});
        if (!profesor)
          throw new BusinessLogicException("El profesor con la cedula dada no se encontró", BusinessError.NOT_FOUND);
      
        await this.profesorRepository.remove(profesor);
    }
}
