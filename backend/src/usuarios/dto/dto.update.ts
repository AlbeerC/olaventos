import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  nombre?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @MinLength(6)
  password?: string

  @IsOptional()
  @IsString()
  descripcion?: string
}
