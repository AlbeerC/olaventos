import { UseGuards, Controller, Post, Body, Req, Get, Delete, Param } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { FavoritosService } from './favoritos.service'
import { CreateFavoritoDto } from '../dto/favoritos/create-favoritos.dto'

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async crear(@Body() dto: CreateFavoritoDto, @Req() req) {
    const usuarioId = req.user.userId
    return this.favoritosService.crear(usuarioId, dto.eventoId)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async obtener(@Req() req) {
    return this.favoritosService.obtenerPorUsuario(req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':eventoId')
  async eliminar(@Param('eventoId') eventoId: number, @Req() req) {
    return this.favoritosService.eliminar(req.user.userId, eventoId)
  }
}
