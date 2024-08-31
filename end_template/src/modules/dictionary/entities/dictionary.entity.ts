import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
export enum ParentType {
  SON = 0,
  FATHRER = 1,
}
export enum StatusType {
  activate = 0, // 启用
  disable = 1, // 禁用
}
@Entity('dictionary')
export class Dictionary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'dictionary_value',
    length: 10,
    comment: '字典值',
  })
  dictionaryValue: string;

  @Column({ name: 'dictionary_name', comment: '字典名称' })
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

  @Column({
    name: 'remark',
    type: 'varchar',
    length: 50,
    comment: '备注',
    nullable: true,
  })
  remark?: string;

  @Exclude()
  @Column({ name: 'is_delete', comment: '删除标志', default: '0' })
  isDelete: string;

  @Column({
    name: 'status',
    comment: '状态 0:禁用 1:启用',
    default: StatusType.activate,
  })
  status: StatusType;

  @Column({ name: 'parent_id' })
  parentId: string;

  @Column({
    name: 'parent_type',
    comment: '0:子类 1:父类',
    default: ParentType.SON,
  })
  parentType: ParentType;
}
