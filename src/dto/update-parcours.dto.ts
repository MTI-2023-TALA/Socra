import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateParcoursDto {
  @IsNotEmpty()
  @IsString()
  description!: string;
}
