import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CommonEntity {
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
}
