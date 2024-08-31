import { Injectable } from '@nestjs/common';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { Repository } from 'typeorm';
import { ApiException, ApiErrCode } from '../../core/exceptions/api.exception';
import { UserInfoDto } from '../user/dto/user-info.dto';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private dictionaryRepository: Repository<Dictionary>,
  ) {}
  async create(
    createDictionaryDto: CreateDictionaryDto,
    userInfo: UserInfoDto,
  ) {
    const { dictionaryValue, dictionaryName } = createDictionaryDto;
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
    const newDic = await this.dictionaryRepository.create({
      ...createDictionaryDto,
      createBy: userInfo.userId,
      updateBy: userInfo.userId,
    });
    await this.dictionaryRepository.save(newDic);
    return null;
  }

  async findOne(id: string) {
    const column = await this.dictionaryRepository.findOne({
      where: [{ id, isDelete: '0' }],
    });
    if (!column || column.parentId) {
      return column ?? null;
    } else {
      const children = await this.dictionaryRepository.find({
        where: [{ parentId: column.id, isDelete: '0' }],
      });
      return { parent: column, children };
    }
  }

  async findAll(parentType = '0,1', keyWord?: string) {
    const splitParentType = parentType.split(',');

    // 初始化查询条件
    const query = this.dictionaryRepository
      .createQueryBuilder('dictionary')
      .where('dictionary.isDelete = :isDelete', { isDelete: '0' });

    // 处理 parentType 查询
    if (splitParentType.length === 1) {
      query.andWhere('dictionary.parentType = :parentType', {
        parentType: splitParentType[0],
      });
    } else if (splitParentType.length === 2) {
      query.andWhere('dictionary.parentType IN (:...parentTypes)', {
        parentTypes: splitParentType,
      });
    }

    // 处理关键字查询
    if (keyWord) {
      query.andWhere(
        '(dictionary.dictionaryName LIKE :keyWord OR dictionary.dictionaryValue LIKE :keyWord)',
        { keyWord: `%${keyWord}%` },
      );
    }

    let columns = await query.getMany();

    if (splitParentType?.length === 2) {
      columns
        .filter((item) => item.parentId)
        .forEach((item) => {
          const parent = columns.find(
            (parent) => parent.id === item.parentId,
          ) as any;
          if (parent) {
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
          }
        });
      columns = columns.filter((item) => !item.parentId);
    }
    return {
      columns,
      total: columns.length,
    };
  }

  async updateDelete(user, id: string) {
    const column = await this.dictionaryRepository.update(
      { id },
      { isDelete: '1' },
    );
    if (column.affected == 0)
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    return null;
  }

  async updateField(id: string, body: UpdateDictionaryDto) {
    const {
      dictionaryName,
      dictionaryDesc,
      status,
      parentId,
      parentType,
      remark,
    } = body;

    const updateData: UpdateDictionaryDto = {
      ...(dictionaryName && { dictionaryName }),
      ...(dictionaryDesc && { dictionaryDesc }),
      ...(status && { status }),
      ...(parentId && { parentId }),
      ...(parentType && { parentType }),
      ...(remark && { remark }),
    };
    const column = await this.dictionaryRepository.update({ id }, updateData);
    if (column.affected === 0)
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    return null;
  }
}
