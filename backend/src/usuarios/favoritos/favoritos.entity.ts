import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuario.entity';
import { Evento } from '../../organizadores/entities/evento.entity'

@Entity('favorites')
export class Favorito {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Usuario, usuario => usuario.favoritos, { onDelete: 'CASCADE' })
    usuario: Usuario

    @ManyToOne(() => Evento, { onDelete: 'CASCADE' })
    evento: Evento

    @CreateDateColumn()
    fechaAgregado: Date
}
