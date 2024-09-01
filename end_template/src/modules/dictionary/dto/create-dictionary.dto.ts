import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { PARENTTYPE, STATUSTYPE } from 'src/enum';

export class CreateDictionaryDto {
  @ApiProperty({ description: '字典值' })
  @IsNotEmpty({ message: '字典值不能为空' })
  dictionaryValue: string;

  @ApiProperty({ description: '字典名称' })
  @IsNotEmpty({ message: '字典名称不能为空' })
  dictionaryName: string;

  @ApiProperty({ description: '字典描述' })
  dictionaryDesc?: string;

  @ApiProperty({ description: '创建人' })
  createBy?: string;

  @ApiProperty({ description: '更新人' })
  updateBy?: string;

  @ApiProperty({ description: '状态' })
  status: STATUSTYPE;

  @ApiProperty({ description: '父级id' })
  parentId: string;

  @ApiProperty({
    description: '父类',
    enum: PARENTTYPE,
    example: PARENTTYPE.SON,
  })
  @IsEnum(PARENTTYPE, { message: 'parentType 必须是 0 或者 1' })
  parentType: PARENTTYPE;
}
