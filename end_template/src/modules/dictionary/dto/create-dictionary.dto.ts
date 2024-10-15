import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { PARENTTYPE, STATUSTYPE } from 'src/enum';
import { CommonEntity } from 'src/modules/base.entity';

export class CreateDictionaryDto extends CommonEntity {
  @ApiProperty({ description: '字典值' })
  @IsNotEmpty({ message: '字典值不能为空' })
  dictionaryValue: string;

  @ApiProperty({ description: '字典名称' })
  @IsNotEmpty({ message: '字典名称不能为空' })
  dictionaryName: string;

  @ApiProperty({ description: '字典描述' })
  dictionaryDesc?: string;

  @ApiProperty({ description: '状态', enum: STATUSTYPE })
  @IsEnum(STATUSTYPE, { message: 'status 必须是 0 或者 1' })
  status: STATUSTYPE;

  @ApiProperty({ description: '父级id' })
  @IsOptional()
  pid?: string | null;

  @ApiProperty({
    description: '父类',
    enum: PARENTTYPE,
    example: PARENTTYPE.SON,
  })
  @IsEnum(PARENTTYPE, { message: 'parentType 必须是 0 或者 1' })
  parentType: PARENTTYPE;
}
