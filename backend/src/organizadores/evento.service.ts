import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventoService {
    constructor(
        @InjectRepository(Evento)
        private readonly eventoRepository: Repository<Evento>,
    ) { }

    async create(createEventoDto: CreateEventoDto): Promise<Evento> {
        const evento = this.eventoRepository.create(createEventoDto);
        return await this.eventoRepository.save(evento);
    }

    async findAll(): Promise<Evento[]> {
        return await this.eventoRepository.find();
    }

    // eventos.service.ts
    async findOne(id: number) {
        const evento = await this.eventoRepository
            .createQueryBuilder('evento')
            .leftJoin('usuarios', 'usuario', 'usuario.id = evento.organizadorId')
            .addSelect(['usuario.nombre'])
            .where('evento.id = :id', { id })
            .getRawOne()

        if (!evento) {
            throw new NotFoundException('Evento no encontrado')
        }

        return {
            id: evento.evento_id,
            titulo: evento.evento_titulo,
            organizadorId: evento.evento_organizadorId,
            organizadorNombre: evento.usuario_nombre,
            fecha: evento.evento_fecha,
            hora: evento.evento_hora,
            lugar: evento.evento_lugar,
            descripcion: evento.evento_descripcion,
            imagen: evento.evento_imagen,
            categoria: evento.evento_categoria,
            direccion: evento.evento_direccion,

        }
    }


    async update(id: number, updateEventoDto: UpdateEventoDto): Promise<Evento> {
        const evento = await this.findOne(id);
        Object.assign(evento, updateEventoDto);
        return await this.eventoRepository.save(evento);
    }

    async remove(id: number): Promise<void> {
        const evento = await this.findOne(id);
        await this.eventoRepository.remove(evento);
    }
}