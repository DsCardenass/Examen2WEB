import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    grupoInv: string;

    @Column()
    extension: number;

    @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
    propuesta: PropuestaEntity[];
}