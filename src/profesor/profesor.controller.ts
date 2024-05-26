import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity/profesor.entity';

@Controller('profesores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {

    constructor(private readonly profesorService: ProfesorService) { }

    @Post()
    async create(@Body() profesor: ProfesorEntity): Promise<ProfesorEntity> {
        return this.profesorService.create(profesor);
    }

    @Get(':profesorId')
    async findOne(@Param('profesorId', ParseIntPipe) profesorId: number): Promise<ProfesorEntity> {
        return this.profesorService.findById(profesorId);
    }

    @Delete(':profesorId')
    async eliminarProfesor(@Param('profesorId', ParseIntPipe) profesorId: number): Promise<void> {
        return this.profesorService.deleteById(profesorId);
    }

    @Delete(':cedula')
    async eliminarProfesorPorCedula(@Param('cedula', ParseIntPipe) cedula: number): Promise<void> {
        return this.profesorService.deleteByCed(cedula);
    }

}
