import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator'

export class CreateEventoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string

  @IsNotEmpty()
  @IsString()
  descripcion: string

  @IsNotEmpty()
  @IsDateString()
  fecha: string // ISO string desde frontend

  @IsNotEmpty()
  @IsString()
  hora: string

  @IsNotEmpty()
  @IsString()
  categoria: string

  @IsNotEmpty()
  @IsString()
  lugar: string

  @IsNotEmpty()
  @IsString()
  direccion: string

  @IsNotEmpty()
  @IsString()
  imagen: string // ruta o URL

  @IsNotEmpty()
  @IsNumber()
  organizadorId: number
}
