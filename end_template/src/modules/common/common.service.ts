import { Injectable } from '@nestjs/common';
import { CreateCommonDto } from './dto/create-common.dto';
import { CommonInfo } from './entities/common.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(CommonInfo)
    private commonInfoRepository: Repository<CommonInfo>,
  ) {}

  async create(createCommonDto: CreateCommonDto, userInfo) {
    const info = await this.commonInfoRepository.create(createCommonDto);
    await this.commonInfoRepository.save({
      ...info,
      createBy: userInfo.userName,
      updateBy: userInfo.userName,
    });
    return null;
  }

  findAll() {
    return `This action returns all common`;
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }
}
