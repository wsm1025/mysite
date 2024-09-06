import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteMenuDto {
  @IsString()
  @IsNotEmpty({ message: '菜单id不能为空' })
  id: string;
}
