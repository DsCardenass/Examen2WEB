import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity])],
  providers: [ProfesorService]
})
export class ProfesorModule {}
