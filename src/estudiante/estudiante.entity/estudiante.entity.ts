import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstudianteEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 nombre: string;
 
 @Column()
 codigo: string;
 
 @Column()
 creditos: number;
}