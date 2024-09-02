import { USERROLRTYPE } from 'src/enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  path?: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  file?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  icon?: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  isIframe?: boolean;

  @Column({ type: 'varchar', nullable: true, default: '' })
  url?: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  shows?: boolean;

  @Column({ type: 'boolean', default: false })
  keepAlive: boolean;

  @Column({ type: 'boolean', default: false })
  tabFix: boolean;

  @Column({ type: 'boolean', default: false })
  tabHidden: boolean;

  @Column({ type: 'int', default: 0 })
  order: number;

  // 需要的权限 permission []
  @Exclude()
  @Column({ type: 'varchar', nullable: true, default: [] })
  permission?: USERROLRTYPE[];

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
