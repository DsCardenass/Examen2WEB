import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}