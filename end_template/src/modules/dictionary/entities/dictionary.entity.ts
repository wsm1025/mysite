import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PARENTTYPE, STATUSTYPE } from 'src/enum';
import { CommonEntity } from 'src/modules/base.entity';
import { IsEnum, IsNotEmpty, Length } from 'class-validator';
@Entity('dictionary')
export class Dictionary extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'dictionary_value',
    length: 30,
    comment: '字典值',
  })
  @IsNotEmpty({ message: '字典值不能为空' })
  @Length(3, 30, {
    message: `字典名称长度必须是$constraint1到$constraint2之间`,
  })
  dictionaryValue: string;

  @Column({ name: 'dictionary_name', comment: '字典名称', length: 20 })
  @IsNotEmpty({ message: '字典名称不能为空' })
  @Length(3, 20, {
    message: `字典名称长度必须是$constraint1到$constraint2之间`,
  })
  dictionaryName: string;

  @Column({
    name: 'dictionary_desc',
    type: 'varchar',
    length: 50,
    comment: '字典描述',
    nullable: true,
  })
  dictionaryDesc?: string;

  @Exclude()
  @Column({ name: 'is_delete', comment: '删除标志', default: '0' })
  isDelete: STATUSTYPE;

  @Column({
    name: 'status',
    comment: '状态  0:启用 1:禁用',
    default: STATUSTYPE.ACTIVE,
  })
  @IsEnum(STATUSTYPE, { message: 'status 必须是 0 或者 1' })
  status: STATUSTYPE;

  @Column({ name: 'pid', nullable: true })
  @IsNotEmpty({ message: '父级id不能为空' })
  pid: string | null;

  @Column({
    name: 'parent_type',
    comment: '0:子类 1:父类',
    default: PARENTTYPE.SON,
  })
  @IsEnum(PARENTTYPE, { message: 'parentType 必须是 0 或者 1' })
  parentType: PARENTTYPE;
}
