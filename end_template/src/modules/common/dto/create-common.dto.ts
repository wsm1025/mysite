import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { COMMONTYPE } from 'src/enum';

export class CreateCommonDto {
  @IsNotEmpty({ message: '操作类型不能为空' })
  @IsEnum(COMMONTYPE, { message: 'type 必须是 合理枚举值' })
  type: COMMONTYPE;

  @IsOptional()
  @IsString()
  info?: Record<string, any>;
}
