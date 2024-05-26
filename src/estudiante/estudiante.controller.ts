import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) { }

    @Post()
    async create(@Body() estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        return this.estudianteService.create(estudiante);
    }

    @Get(':estudianteId')
    async findOne(@Param('estudianteId') estudianteId: number) {
        return await this.estudianteService.findOne(estudianteId);
    }
}
