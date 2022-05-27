import { IsDate, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateParcoursDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  campus!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  durationInMonths!: number;

  @IsNotEmpty()
  @IsString()
  type!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price!: number;

  @IsNotEmpty()
  @IsString()
  @Min(0)
  @Max(100)
  onSitePercentage!: number;

  @IsNotEmpty()
  @IsDate()
  beginDate!: Date;

  @IsNotEmpty()
  modules!: CreateModulesDto[];
}

class CreateModulesDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;
}
