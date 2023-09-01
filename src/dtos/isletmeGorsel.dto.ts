import { IsNotEmpty, IsString } from 'class-validator';

export class GorsellerDTO {
  @IsNotEmpty()
  isletme: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  photoName: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
