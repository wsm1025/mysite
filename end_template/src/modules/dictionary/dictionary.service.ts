import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { Repository } from 'typeorm';
import { ApiException, ApiErrCode } from '../../core/exceptions/api.exception';
import { UserInfoDto } from '../user/dto/user-info.dto';
import { PARENTTYPE, STATUSTYPE } from 'src/enum';

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
        { dictionaryValue, isDelete: STATUSTYPE.ACTIVE },
        { dictionaryName, isDelete: STATUSTYPE.ACTIVE },
      ],
    });
    if (exist) {
      throw new ApiException(ApiErrCode.DICTIONARY_EXIST);
    }
    const newDic = await this.dictionaryRepository.create({
      ...createDictionaryDto,
      createBy: userInfo.userName,
      updateBy: userInfo.userName,
    });
    try {
      await this.dictionaryRepository.save(newDic);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return null;
  }
  async findOne(id: string) {
    const column = await this.dictionaryRepository.findOne({
      where: [{ id, isDelete: STATUSTYPE.ACTIVE }],
    });
    return column ?? {};
  }

  async findDicByParentName(name: string) {
    const list = await this.dictionaryRepository.find({
      where: [
        { dictionaryValue: name, isDelete: STATUSTYPE.ACTIVE },
        {
          pid: (
            await this.dictionaryRepository.findOne({
              where: { dictionaryValue: name, isDelete: STATUSTYPE.ACTIVE },
            })
          )?.id,
          isDelete: STATUSTYPE.ACTIVE,
        },
      ],
    });
    return list.filter((e) => Boolean(e.pid));
  }

  async findAll(parentType = '0,1', keyWord?: string){
    const splitParentType = parentType.split(',');
    // 初始化查询条件
    const query = this.dictionaryRepository
      .createQueryBuilder('dictionary')
      .where('dictionary.isDelete = :isDelete', {
        isDelete: STATUSTYPE.ACTIVE,
      });

    // 处理关键字查询
    if (keyWord) {
      query.andWhere(
        '(dictionary.dictionaryName LIKE :keyWord OR dictionary.dictionaryValue LIKE :keyWord)',
        { keyWord: `%${keyWord}%` },
      );
    }
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

    let columns = await query.getMany();
    if (splitParentType?.length === 2) {
      columns
        .filter((item) => item.pid)
        .forEach((item) => {
          const parent = columns.find(
            (parent) => parent.id === item.pid,
          ) as any;
          if (parent) {
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
          }
        });
      columns = columns.filter((item) => !item.pid);
    }
    return columns
  }

  async updateDelete(id: string) {
    const column = await this.dictionaryRepository.update(
      { id },
      { isDelete: STATUSTYPE.INACTIVE },
    );
    if (column.affected == 0)
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    return null;
  }

  async updateField(id: string, body: UpdateDictionaryDto) {
    const { status, dictionaryName, dictionaryDesc, parentType, pid } =
      body;
    const record = await this.dictionaryRepository.findOne({
      where: [{ id, isDelete: STATUSTYPE.ACTIVE }],
    });
    const updateData: Omit<UpdateDictionaryDto, 'id'> = {
      ...(dictionaryName && { dictionaryName }),
      ...(dictionaryDesc && { dictionaryDesc }),
      ...(status && { status }),
      ...(parentType && { parentType }),
      pid,
    };
    const column = await this.dictionaryRepository.update({ id }, updateData);
    if (
      record.parentType == PARENTTYPE.FATHRER &&
      status == STATUSTYPE.INACTIVE
    ) {
      // 更新所有pid=id的字典
      await this.dictionaryRepository.update(
        { pid: id },
        { status: STATUSTYPE.INACTIVE },
      );
    }
    if (column.affected === 0)
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    return null;
  }
}
