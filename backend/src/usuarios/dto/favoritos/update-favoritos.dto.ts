import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoritoDto } from './create-favoritos.dto';

export class UpdateFavoritoDto extends PartialType(CreateFavoritoDto) { }
