import { Module } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PropuestaEntity])],
  providers: [PropuestaService]
})
export class PropuestaModule {}
