import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProyectoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @Column()
    url: string;
}