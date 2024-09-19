import { IsNotEmpty, Length, IsOptional } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty({ message: 'userId不能为空' })
  userId: string;

  @IsOptional()
  @Length(0, 10, {
    message: `昵称长度必须是$constraint1到$constraint2之间`,
  })
  nickName?: string;

  @IsOptional()
  @Length(6, 20, {
    message: `email必须是$constraint1到$constraint2之间`,
  })
  email?: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  operationList?: any;
}
