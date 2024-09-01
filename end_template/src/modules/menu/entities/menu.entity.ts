import { USERROLRTYPE } from 'src/enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  path?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  file?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  icon?: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  isIframe?: boolean;

  @Column({ type: 'string', nullable: true, default: '' })
  url?: boolean;

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

  // 需要的权限
  @Exclude()
  @Column({ type: 'varchar', length: 20, nullable: true })
  permission?: Array<USERROLRTYPE>;
}
