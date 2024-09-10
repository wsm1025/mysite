import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiErrCode, ApiException } from '../../core/exceptions/api.exception';

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'userName',
      passwordField: 'passWord',
    } as IStrategyOptions);
  }

  async validate(userName: string, passWord: string) {
    const user = await this.userRepository.findOne({
      where: { userName },
    });
    if (!user) {
      throw new ApiException(ApiErrCode.USER_NOT_EXIST);
    }

    if (!compareSync(passWord, user.passWord)) {
      // 对比密码 如果不正确，抛出异常
      throw new ApiException(ApiErrCode.PASSWORD_ERROR);
    }

    return user;
  }
}
