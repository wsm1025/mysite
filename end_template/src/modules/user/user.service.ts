import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiException, ApiErrCode } from '../../core/exceptions/api.exception';
import { User } from './entities/user.entity';
import { STATUSTYPE } from 'src/enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUser: CreateUserDto) {
    const { userName } = createUser;
    // 判断用户名是否存在
    const existUser = await this.userRepository.findOne({
      where: { userName, isDelete: STATUSTYPE.ACTIVE },
    });
    if (existUser) {
      throw new ApiException(ApiErrCode.USER_EXIST);
    }
    const newUser = await this.userRepository.create(createUser);
    // 解构后 该对象与原始的 newUser 对象不再具有关联性
    // 手动触发 BeforeInsert
    await this.userRepository.save(newUser);
    return {
      message: '注册成功',
    };
  }
  async update(updateUser: UpdateUserDto) {
    const { userId } = updateUser;
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (!user) {
      throw new ApiException(ApiErrCode.USER_NOT_EXIST);
    }
    // 更新符合条件的记录
    const result = await this.userRepository.update({ userId }, updateUser);
    if (result.affected === 0) {
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    }
    return null;
  }
  async delete(userId, nowUser) {
    if (userId === nowUser.userId) {
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    }
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (!user) {
      throw new ApiException(ApiErrCode.USER_NOT_EXIST);
    }
    const column = await this.userRepository.update(
      { userId },
      { isDelete: STATUSTYPE.INACTIVE },
    );
    if (column.affected === 0)
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    return null;
  }

  async findAll(query) {
    const { size = 10, page = 1, role = '', userName = '' } = query;
    const where = {
      isDelete: STATUSTYPE.ACTIVE,
      ...(role && { role }),
      ...(userName && { userName }),
    };
    const startSize = (Number(page) - 1) * Number(size) ?? 0;
    const [data, total] = await this.userRepository.findAndCount({
      where,
      skip: startSize, // 跳过多少条
      take: size, // 获取多少条
      order: {
        createTime: 'DESC', // 排序 按照时间倒序
      },
    });
    return {
      data,
      total,
    };
  }

  async findOne(userId: string) {
    const userInfo = await this.userRepository.findOne({
      where: { userId },
    });
    return userInfo;
  }
}
