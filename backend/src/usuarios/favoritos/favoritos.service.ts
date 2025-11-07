import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Favorito } from '../../usuarios/favoritos/favoritos.entity'
import { CreateFavoritoDto } from '../dto/favoritos/create-favoritos.dto'

@Injectable()
export class FavoritosService {
  constructor(
    @InjectRepository(Favorito)
    private readonly favoritosRepository: Repository<Favorito>,
  ) {}

  async crear(usuarioId: number, eventoId: number) {
    const existente = await this.favoritosRepository.findOne({
      where: { usuario: { id: usuarioId }, evento: { id: eventoId } },
    })

    if (existente)
      throw new ConflictException('Este evento ya está en tus favoritos')

    const nuevo = this.favoritosRepository.create({
      usuario: { id: usuarioId },
      evento: { id: eventoId },
    })

    return this.favoritosRepository.save(nuevo)
  }

  async obtenerPorUsuario(usuarioId: number) {
    const favoritos = await this.favoritosRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['evento'],
    })

    if (!favoritos.length)
      throw new NotFoundException('No tienes eventos en favoritos')

    return favoritos
  }

  async eliminar(usuarioId: number, eventoId: number) {
    const resultado = await this.favoritosRepository.delete({
      usuario: { id: usuarioId },
      evento: { id: eventoId },
    })

    if (resultado.affected === 0)
      throw new NotFoundException('El favorito no existe')

    return { message: 'Favorito eliminado correctamente' }
  }
}