import { IsNumber, IsString } from 'class-validator';

export class CreateMenuItemDto {
  @IsString({ message: 'Название позиции должно быть строкой' })
  readonly name: string;
  @IsNumber()
  readonly price: number;
  readonly weight: number;
  readonly description: string;
  readonly isEmpty?: boolean;
}
