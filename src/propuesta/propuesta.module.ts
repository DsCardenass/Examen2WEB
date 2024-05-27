import { Module } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaController } from './propuesta.controller';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropuestaEntity, ProyectoEntity, ProfesorEntity])],
  providers: [PropuestaService],
  controllers: [PropuestaController]
})
export class PropuestaModule {}
