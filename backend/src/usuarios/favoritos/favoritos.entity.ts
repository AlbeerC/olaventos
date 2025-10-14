import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('favorites')
export class Favorito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    itemType: string; // evento, organizador,etc...

    @Column()
    itemId: number;
}
