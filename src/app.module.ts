import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { ProfesorEntity } from './profesor/profesor.entity/profesor.entity';
import { PropuestaEntity } from './propuesta/propuesta.entity/propuesta.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity/proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProfesorModule, EstudianteModule, PropuestaModule, ProyectoModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'museum',
    entities: [EstudianteEntity, ProfesorEntity, PropuestaEntity, ProyectoEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
