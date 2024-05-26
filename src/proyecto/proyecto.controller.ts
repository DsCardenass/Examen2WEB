import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';

@Controller('proyectos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) { }

    @Post()
    async create(@Body() proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        return this.proyectoService.create(proyecto);
    }
}
