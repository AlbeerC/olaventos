import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario, UserRole } from './usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>
  ) { }

  // Obtener todos los usuarios
  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find()
  }

  // Crear un usuario
  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = this.usuariosRepository.create({
      ...data,
      password: hashedPassword,
      aprobado: data.rol === 'organizer' ? false : true,
    })

    return this.usuariosRepository.save(newUser)
  }

  // Obtener un usuario por ID
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } })
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`)
    }
    return usuario
  }

  // Obtener un usuario por Email
  findByEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } })
  }

  // Actualizar un usuario
  async update(id: number, updateData: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.findOne(id)
    Object.assign(usuario, updateData)
    return await this.usuariosRepository.save(usuario)
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id)
    await this.usuariosRepository.remove(usuario)
  }

  // Aprobar un usuario organizador después de revisión por un admin
  async approve(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id)
    usuario.aprobado = true
    return this.usuariosRepository.save(usuario)
  }
}

