import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from 'src/usuarios/dto/register-usuario.dto'
import { RegisterOrganizerDto } from './dto/register-organizer.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.authService.validateUser(body.email, body.password)
    return this.authService.login(user)
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }

  @Post('register-organizer')
  async registerOrganizer(@Body() data: RegisterOrganizerDto) {
    return this.authService.registerOrganizer(data)
  }

}