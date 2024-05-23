import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PropuestaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    palabra: string;
}