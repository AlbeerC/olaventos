import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column()
  descripcion: string

  @Column()
  fecha: Date

  @Column()
  hora: string

  @Column()
  categoria: string

  @Column()
  lugar: string

  @Column()
  direccion: string

  @Column()
  imagen: string // ruta o URL de la imagen

  @Column()
  organizadorId: number
}