import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';

@Controller('propuestas')
@UseInterceptors(BusinessErrorsInterceptor)
export class PropuestaController {

    constructor(private readonly propuestaService: PropuestaService) { }
    
    @Post()
    async create(@Body() propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        return this.propuestaService.create(propuesta);
    }

    @Get(':propuestaId')
    async findOne(@Param('propuestaId', ParseIntPipe) propuestaId: number): Promise<PropuestaEntity> {
        return this.propuestaService.findOne(propuestaId);
    }

    @Get()
    async findAll(): Promise<PropuestaEntity[]> {
        return this.propuestaService.findAll();
    }

    @Delete(':propuestaId')
    async deletePropuesta(@Param('propuestaId', ParseIntPipe) propuestaId: number): Promise<void> {
        return this.propuestaService.delete(propuestaId);
    }
}
