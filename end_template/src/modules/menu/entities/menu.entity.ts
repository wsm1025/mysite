import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/modules/base.entity';
import { STATUSTYPE } from 'src/enum';
import { IsNotEmpty, Length } from 'class-validator';

@Entity('menu')
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  @IsNotEmpty({ message: '菜单名不能为空' })
  @Length(1, 20, {
    message: `菜单名称长度必须是$constraint1到$constraint2之间`,
  })
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
  pid?: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  shows?: boolean;

  @Column({ type: 'boolean', default: false })
  @IsNotEmpty({ message: '是否可缓存不能为空' })
  keepAlive: boolean;

  @Column({ type: 'boolean', default: false })
  @IsNotEmpty({ message: 'tab是否可固定不能为空' })
  tabFix: boolean;

  @Column({ type: 'boolean', default: false })
  tabHidden: boolean;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'varchar', length: 20, nullable: true, default: null })
  permission?: string | null;

  @Exclude()
  @Column({
    name: 'is_delete',
    comment: '删除标志',
    default: STATUSTYPE.ACTIVE,
  })
  isDelete: STATUSTYPE;
}
