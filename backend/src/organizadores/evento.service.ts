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

    async findOne(id: number): Promise<Evento> {
        const evento = await this.eventoRepository.findOne({ where: { id } });
        if (!evento) throw new NotFoundException(`Evento con id ${id} no encontrado`);
        return evento;
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
