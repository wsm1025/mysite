import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
export enum StatusType {
  activate = '0', // 启用
  disable = '1', // 禁用
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

  @Column({ name: 'dictionary_name', length: 10, comment: '字典名称' })
  dictionaryName: string;

  @Column({ name: 'dictionary_desc', length: 50, comment: '字典描述' })
  dictionaryDesc: string;

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

  @Column({ name: 'createBy', type: 'varchar', length: 10, comment: '创建人' })
  createBy: string;

  @Column({ name: 'updateBy', type: 'varchar', length: 10, comment: '更新人' })
  updateBy: string;

  @Column({ name: 'remark', type: 'varchar', length: 50, comment: '备注' })
  remark: string;

  @Exclude()
  @Column({ name: 'isDelete', comment: '删除标志', default: '0' })
  isDelete: string;

  @Column({
    name: 'status',
    comment: '状态',
    default: StatusType.activate,
    enum: StatusType,
  })
  status: StatusType;

  @Column({ name: 'parent_id', comment: '父级id 1是父级' })
  parentId: string;
}
