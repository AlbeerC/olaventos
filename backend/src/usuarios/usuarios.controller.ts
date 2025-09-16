import { Controller, Get, Post, Body } from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import { Usuario } from './usuario.entity'
import { CreateUsuarioDto } from './dto/create-usuario.dto'

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll()
  }

  @Post()
  create(@Body() data: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(data)
  }
}
