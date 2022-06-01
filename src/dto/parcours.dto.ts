export class ParcoursDto {
  id!: string;
  title!: string;
  campus!: string;
  durationInMonths!: number;
  type!: string;
  price!: number;
  onSitePercentage!: number;
  beginDate!: Date;
  modules!: ModulesDto[];
  description!: string;
  createdAt!: Date;
}

class ModulesDto {
  title!: string;
  description!: string;
}
