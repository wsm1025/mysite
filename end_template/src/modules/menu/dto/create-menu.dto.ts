import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  isNotEmpty,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  file?: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsBoolean()
  isIframe: boolean;

  @IsOptional()
  @IsString()
  url?: string;

  @IsBoolean()
  shows: boolean;

  @IsBoolean()
  keepAlive: boolean;

  @IsBoolean()
  tabFix: boolean;

  @IsBoolean()
  tabHidden: boolean;

  @IsNumber()
  order: number;

  @IsOptional()
  @IsString()
  permission?: string;
}
