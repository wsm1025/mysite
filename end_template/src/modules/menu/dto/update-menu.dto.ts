import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class UpdateMenuDto {
  @IsString({ message: '菜单id必须为字符串' })
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString({ message: '菜单名称必须为字符串' })
  title?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  file?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsBoolean()
  isIframe?: boolean;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsBoolean()
  shows?: boolean;

  @IsOptional()
  @IsBoolean()
  keepAlive?: boolean;

  @IsOptional()
  @IsBoolean()
  tabFix?: boolean;

  @IsOptional()
  @IsBoolean()
  tabHidden?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  permission?: string;
}
