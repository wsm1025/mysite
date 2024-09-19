import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { defaultPassword } from 'src/enum';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string;

  @ApiProperty({ description: '密码' })
  @IsOptional()
  passWord?: string;

  @ApiProperty({ description: '用户角色' })
  role: string;

  @ApiProperty({ description: '用户头像' })
  avatar: string;

  @ApiProperty({ description: '用户邮箱' })
  email: string;

  @BeforeInsert()
  async encryptPwd() {
    this.passWord = await bcrypt.hashSync(this.passWord || defaultPassword);
  }
}
