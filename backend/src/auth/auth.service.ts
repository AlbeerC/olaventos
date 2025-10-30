import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsuariosService } from '../usuarios/usuarios.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user
      return result
    }
    throw new UnauthorizedException('Credenciales inválidas')
  }

  async login(user: any) {
    const payload = { email: user.email, rol: user.rol, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        aprobado: user.aprobado,
        descripcion: user.descripcion
      }
    }
  }

  async register(data: any) {
    console.log(await this.usersService.findByEmail(data.email))

    const existUser = await this.usersService.findByEmail(data.email)
    if (existUser) {
      throw new BadRequestException('El email ya está registrado')
    }

    return this.usersService.create(data)
  }
}
