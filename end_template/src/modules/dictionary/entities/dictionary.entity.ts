import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PARENTTYPE, STATUSTYPE } from 'src/enum';
@Entity('dictionary')
export class Dictionary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'dictionary_value',
    length: 20,
    comment: '字典值',
  })
  dictionaryValue: string;

  @Column({ name: 'dictionary_name', comment: '字典名称', length: 10 })
  dictionaryName: string;

  @Column({
    name: 'dictionary_desc',
    type: 'varchar',
    length: 50,
    comment: '字典描述',
    nullable: true,
  })
  dictionaryDesc?: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({
    name: 'create_by',
    comment: '创建人',
    nullable: true,
  })
  createBy?: string;

  @Column({
    name: 'update_by',
    comment: '更新人',
    nullable: true,
  })
  updateBy?: string;

  @Exclude()
  @Column({ name: 'is_delete', comment: '删除标志', default: '0' })
  isDelete: STATUSTYPE;

  @Column({
    name: 'status',
    comment: '状态  0:启用 1:禁用',
    default: STATUSTYPE.ACTIVE,
  })
  status: STATUSTYPE;

  @Column({ name: 'parent_id', nullable: true })
  parentId?: string;

  @Column({
    name: 'parent_type',
    comment: '0:子类 1:父类',
    default: PARENTTYPE.SON,
  })
  parentType: PARENTTYPE;
}
