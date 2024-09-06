import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/modules/common.entity';
import { STATUSTYPE } from 'src/enum';

@Entity('menu')
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  path?: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  file?: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  icon?: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  isIframe?: boolean;

  @Column({ type: 'varchar', nullable: true, default: '' })
  url?: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  pid?: any;

  @Column({ type: 'boolean', default: true, nullable: true })
  shows?: boolean;

  @Column({ type: 'boolean', default: false })
  keepAlive: boolean;

  @Column({ type: 'boolean', default: false })
  tabFix: boolean;

  @Column({ type: 'boolean', default: false })
  tabHidden: boolean;

  @Column({ type: 'int', default: 0 })
  order: number;

  // 需要的权限
  @Exclude()
  @Column({ type: 'varchar', length: 20, nullable: true, default: null })
  permission?: string | null;

  @Exclude()
  @Column({ name: 'is_delete', comment: '删除标志', default: '0' })
  isDelete: STATUSTYPE;
}
