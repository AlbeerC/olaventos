import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuariosService } from './usuarios.service'
import { UsuariosController } from './usuarios.controller'
import { Usuario } from './usuario.entity'
import { Favorito } from './favoritos/favoritos.entity';
import { FavoritosService } from './favoritos/favoritos.service';
import { FavoritosController } from './favoritos/favoritos.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Favorito])],
  controllers: [UsuariosController, FavoritosController],
  providers: [UsuariosService, FavoritosService],
  exports: [UsuariosService, FavoritosService],
})
export class UsuariosModule { }
