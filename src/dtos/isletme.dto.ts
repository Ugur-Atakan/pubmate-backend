import { IsNotEmpty, IsString } from 'class-validator';

export class IsletmelerDTO {
  @IsNotEmpty()
  @IsString()
  isletmeAdi: string;

  @IsNotEmpty()
  @IsString()
  isletmeTelefonu: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  isletmeTipi: string;

  @IsNotEmpty()
  @IsString()
  isletmeWebSitesi: string;

  @IsNotEmpty()
  @IsString()
  isletmeAcikAdresi: string;
}
