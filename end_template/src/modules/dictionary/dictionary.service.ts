import { Injectable } from '@nestjs/common';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary, StatusType } from './entities/dictionary.entity';
import { Repository } from 'typeorm';
import { ApiException, ApiErrCode } from '../../core/exceptions/api.exception';
import { ListDicDto } from './dto/dictionary-info.dto';
import { UserRoleEnum } from '../user/entities/user.entity';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private dictionaryRepository: Repository<Dictionary>,
  ) {}
  async create(createDictionaryDto: CreateDictionaryDto) {
    const { dictionaryValue, dictionaryName } = createDictionaryDto;
    console.log(dictionaryValue, dictionaryName);
    // 使用 OR 条件来查找
    const exist = await this.dictionaryRepository.findOne({
      where: [
        { dictionaryValue, isDelete: '0' },
        { dictionaryName, isDelete: '0' },
      ],
    });
    if (exist) {
      throw new ApiException(ApiErrCode.DICTIONARY_EXIST);
    }
    const newDic = await this.dictionaryRepository.create(createDictionaryDto);
    await this.dictionaryRepository.save(newDic);
    return {};
  }

  async findOne(id: string) {
    const column = await this.dictionaryRepository.findOne({
      where: [{ id, isDelete: '0' }],
    });
    if (!column || column.parentId) {
      return column ?? [];
    } else {
      const children = await this.dictionaryRepository.find({
        where: [{ parentId: column.id, isDelete: '0' }],
      });
      return { parent: column, children };
    }
  }

  async findAll(query: ListDicDto) {
    const search = {
      isDelete: '0', // 查询未删除的
      keyword: query.keyWord ? query.keyWord : undefined,
    };

    // 获取字典列表和总数
    const [dictionaryList, total] =
      await this.dictionaryRepository.findAndCount({
        where: search,
        order: { createTime: 'DESC' },
      });
    // 创建一个 Map 以快速查找每个项
    const itemMap = new Map();
    dictionaryList.forEach((item) => itemMap.set(item.id, item));

    // 处理子项
    dictionaryList.forEach((item) => {
      if (item.parentId) {
        const parent = itemMap.get(item.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(item);
        }
      }
    });
    // 释放 itemMap
    itemMap.clear();
    // 获取所有父项
    const parentList = dictionaryList.filter((item) => !item.parentId);
    return {
      parentList,
      parentTotal: parentList.length,
      total,
    };
  }

  async updateDelete(user, id: string) {
    if (user.role !== UserRoleEnum.Admin) {
      throw new ApiException(ApiErrCode.NO_PERMISSIN);
    }
    await this.dictionaryRepository.update({ id }, { isDelete: '1' });
    return {};
  }
  async updateStatus(id: string, status: StatusType) {
    await this.dictionaryRepository.update({ id }, { status });
    return {};
  }
}
