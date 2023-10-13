import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly categoryName: string;
}
