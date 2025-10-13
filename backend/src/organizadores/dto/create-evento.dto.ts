import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateEventoDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsDateString()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    lugar: string;

    @IsNumber()
    organizadorId: number;
}
