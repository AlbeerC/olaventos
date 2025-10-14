import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateFavoritoDto {
    @IsNumber()
    userId: number;

    @IsString()
    @IsNotEmpty()
    itemType: string;

    @IsNumber()
    itemId: number;
}
