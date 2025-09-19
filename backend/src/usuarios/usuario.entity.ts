import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export enum UserRole {
  USER = 'user',
  ORGANIZER = 'organizer',
  ADMIN = 'admin'
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  rol: UserRole

  @Column({ type: 'text', nullable: true })
  descripcion?: string

  @Column({ default: true })
  aprobado: boolean
}
