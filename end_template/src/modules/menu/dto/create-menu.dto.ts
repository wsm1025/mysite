import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty({ message: '菜单名不能为空' })
  @Length(1, 20, {
    message: `菜单名称长度必须是$constraint1到$constraint2之间`,
  })
  title: string;

  @IsOptional()
  @IsString({ message: 'path必须是字符串' })
  path?: string;

  @IsOptional()
  @IsString({ message: 'file必须是字符串' })
  file?: string;

  @IsString({ message: 'icon必须是字符串' })
  @IsNotEmpty({ message: 'icon不能为空' })
  icon: string;

  @IsBoolean({ message: 'isIframe必须是 true 或 false' })
  @IsNotEmpty({ message: 'isIframe不能为空' })
  isIframe: boolean;

  @IsOptional()
  @IsString({ message: 'url必须是字符串' })
  url?: string;

  @IsBoolean({ message: 'shows必须是 true 或 false' })
  @IsNotEmpty({ message: 'shows不能为空' })
  shows: boolean;

  @IsBoolean({ message: 'keepAlive必须是 true 或 false' })
  @IsNotEmpty({ message: 'keepAlive不能为空' })
  keepAlive: boolean;

  @IsBoolean({ message: 'tabFix必须是 true 或 false' })
  @IsNotEmpty({ message: 'tabFix不能为空' })
  tabFix: boolean;

  @IsBoolean({ message: 'tabHidden必须是 true 或 false' })
  @IsNotEmpty({ message: 'tabHidden不能为空' })
  tabHidden: boolean;

  @IsNumber()
  @IsNotEmpty({ message: 'order不能为空' })
  order: number;

  @IsOptional()
  @IsString()
  permission?: string;
}
