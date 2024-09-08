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
import { STATUSTYPE, USERROLRTYPE } from 'src/enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ name: 'user_name', length: 10, comment: '用户名' })
  userName: string;

  @Column({
    name: 'nick_name',
    length: 10,
    comment: '昵称',
  })
  nickName: string;

  @Exclude()
  @Column({ comment: '密码', length: 100 })
  passWord: string;

  @Column({ comment: '邮箱', nullable: true, length: 20 })
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
    default: 'user_list,dictionary_list,menu_list',
  })
  opreration: string;

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
  @Column({ name: 'is_delete', comment: '删除标志', default: '0' })
  isDelete: STATUSTYPE;

  @BeforeInsert()
  async encryptPwd() {
    if (!this.passWord) return;
    this.passWord = await bcrypt.hashSync(this.passWord);
  }
  // 都会执行
  @BeforeInsert()
  setNickName() {
    // 设置昵称
    if (!this.nickName) {
      this.nickName = this.userName;
    }
  }
}
