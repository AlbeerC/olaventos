import { Controller, Get, Post, Put, Delete, Patch, Param, Body } from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import { Usuario } from './usuario.entity'
import { CreateUsuarioDto } from './dto/create-usuario.dto'

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id)
  }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Usuario>) {
    return this.usuariosService.update(+id, updateData)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id)
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.usuariosService.approve(+id)
  }
}
