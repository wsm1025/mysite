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
  @Length(3, 20, {
    message: `菜单名称长度必须是$constraint1到$constraint2之间`,
  })
  title: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  file?: string;

  @IsString()
  @IsNotEmpty({ message: 'icon不能为空' })
  icon: string;

  @IsBoolean({ message: 'isIframe必须是 true 或 false' })
  @IsNotEmpty({ message: 'isIframe不能为空' })
  isIframe: boolean;

  @IsOptional()
  @IsString()
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
