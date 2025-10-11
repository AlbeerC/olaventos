import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('eventos')
export class Evento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    descripcion: string;

    @Column()
    fecha: Date;

    @Column()
    lugar: string;

    @Column()
    organizadorId: number; // referencia al organizador
}
