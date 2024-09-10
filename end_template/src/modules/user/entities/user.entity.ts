import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { OPERATIONTYPE, STATUSTYPE, USERROLRTYPE } from 'src/enum';
import { Length } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ name: 'user_name', length: 10, comment: '用户名' })
  @Length(3, 10, {
    message: `用户名长度必须是$constraint1到$constraint2之间`,
  })
  userName: string;

  @Column({
    name: 'nick_name',
    length: 10,
    comment: '昵称',
  })
  nickName: string;

  @Exclude()
  @Column({ comment: '密码', length: 100 })
  @Length(6, 100, {
    message: `密码必须是$constraint1到$constraint2之间`,
  })
  passWord: string;

  @Column({ comment: '邮箱', nullable: true, length: 20 })
  @Length(6, 20, {
    message: `密码必须是$constraint1到$constraint2之间`,
  })
  email: string;

  @Column({
    comment: '头像',
    nullable: true,
    default: '/static/171327345267698499643.jpeg',
  })
  avatar: string;

  @Column('simple-enum', {
    enum: USERROLRTYPE,
    comment: '角色',
    default: USERROLRTYPE.USER,
  })
  role: string;

  @Column({
    comment: '操作权限',
    default: Object.values(OPERATIONTYPE).join(','),
  })
  operationList: string;

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

  @Exclude()
  @Column({
    name: 'is_delete',
    comment: '删除标志',
    default: STATUSTYPE.ACTIVE,
  })
  isDelete: STATUSTYPE;

  @BeforeInsert()
  async encryptPwd() {
    if (!this.passWord) return;
    this.passWord = await bcrypt.hashSync(this.passWord);
  }

  @BeforeInsert()
  setNickName() {
    // 设置昵称
    if (!this.nickName) {
      this.nickName = this.userName;
    }
  }
}
