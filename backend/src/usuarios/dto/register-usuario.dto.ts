import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString, IsIn } from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  nombre: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string

  @IsNotEmpty()
  @IsIn(['user', 'organizer', 'admin'])
  rol: string

  @IsOptional()
  @IsString()
  descripcion?: string
}
