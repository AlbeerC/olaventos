import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorito } from '../../usuarios/favoritos/favoritos.entity';
import { CreateFavoritoDto } from '../dto/favoritos/create-favoritos.dto';
import { UpdateFavoritoDto } from '../dto/favoritos/update-favoritos.dto';

@Injectable()
export class FavoritosService {
    constructor(
        @InjectRepository(Favorito)
        private readonly favoritoRepository: Repository<Favorito>,
    ) { }

    create(createFavoritoDto: CreateFavoritoDto) {
        const fav = this.favoritoRepository.create(createFavoritoDto);
        return this.favoritoRepository.save(fav);
    }

    findAll() {
        return this.favoritoRepository.find();
    }

    async findOne(id: number) {
        const fav = await this.favoritoRepository.findOne({ where: { id } });
        if (!fav) throw new NotFoundException(`Favorito con id ${id} no encontrado`);
        return fav;
    }

    async update(id: number, updateFavoriteDto: UpdateFavoritoDto) {
        const fav = await this.findOne(id);
        Object.assign(fav, updateFavoriteDto);
        return this.favoritoRepository.save(fav);
    }

    async remove(id: number) {
        const fav = await this.findOne(id);
        await this.favoritoRepository.remove(fav);
    }
}
