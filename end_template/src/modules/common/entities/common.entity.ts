import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { COMMONTYPE } from 'src/enum';
import { CommonEntity } from 'src/modules/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('common')
export class CommonInfo extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'type',
    length: 30,
    comment: '操作类型',
  })
  @IsNotEmpty({ message: '操作类型不能为空' })
  @IsEnum(COMMONTYPE, { message: 'type 必须是 合理枚举值' })
  type: COMMONTYPE;

  // 解析 JSON 字符串到对象
  @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
  // 将对象转换为 JSON 字符串
  @Transform(({ value }) => JSON.stringify(value), { toPlainOnly: true })
  @Column({
    type: 'json',
    name: 'info',
    comment: '信息',
  })
  info?: Record<string, any>;
}
