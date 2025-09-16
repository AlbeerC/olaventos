import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario, UserRole } from './usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find()
  }

  create(data: CreateUsuarioDto): Promise<Usuario> {
    const nuevo = this.usuarioRepository.create({
      ...data,
      rol: UserRole.USER, // por defecto user
    })
    return this.usuarioRepository.save(nuevo)
  }
}

