import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { StatusType } from '../entities/dictionary.entity';
export enum ParentType {
  SON = 0,
  FATHRER = 1,
}
export class CreateDictionaryDto {
  @ApiProperty({ description: '字典值' })
  @IsNotEmpty({ message: '字典值不能为空' })
  dictionaryValue: string;

  @ApiProperty({ description: '字典名称' })
  // 不超过10字
  @IsNotEmpty({ message: '字典名称不能为空' })
  dictionaryName: string;

  @ApiProperty({ description: '字典描述' })
  @IsNotEmpty({ message: '字典描述不能为空' })
  dictionaryDesc: string;

  @ApiProperty({ description: '创建人' })
  @IsNotEmpty({ message: '创建人不能为空' })
  createBy: string;

  @ApiProperty({ description: '更新人' })
  @IsNotEmpty({ message: '更新人不能为空' })
  updateBy: string;

  //   备注
  @ApiProperty({ description: '备注' })
  remark: string;

  // 状态
  @ApiProperty({ description: '状态' })
  status: StatusType;

  @ApiProperty({ description: '父级id' })
  parentId: string;

  @ApiProperty({
    description: '父类',
    enum: ParentType,
    example: ParentType.SON,
  })
  @IsEnum(ParentType, { message: 'parentType 必须是 0 或者 1' })
  parentType: ParentType;
}
