import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { ApiErrCode, ApiException } from 'src/core/exceptions/api.exception';
import { UserInfoDto } from '../user/dto/user-info.dto';
import { STATUSTYPE, USERROLRTYPE } from 'src/enum';
import { DeleteMenuDto } from './dto/delete-menu.dto';
function creataDataItem(data = {}) {
  const item = {
    title: '首页',
    icon: '',
    shows: true,
    path: '',
    order: 1,
    pid: '',
    file: '',
    isIframe: false,
    url: '',
    keepAlive: false,
    tabHidden: false,
    tabFix: false,
    permission: '',
  };
  for (const itemKey in item) {
    if (data[itemKey] || data[itemKey] === false) {
      item[itemKey] = data[itemKey];
    }
  }
  return item;
}
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto, userInfo: UserInfoDto) {
    const newMenu = this.menuRepository.create({
      ...createMenuDto,
      createBy: userInfo.userName,
      updateBy: userInfo.userName,
    });
    const savedMenu = await this.menuRepository.save(newMenu);
    if (!savedMenu) {
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    }
    return null;
  }

  async getList(user: UserInfoDto) {
    const [data] = await this.menuRepository.findAndCount({
      where: { isDelete: STATUSTYPE.ACTIVE },
      order: { order: 'ASC' },
    });
    return user.role === USERROLRTYPE.ADMIN
      ? data
      : data.filter((item) => item.permission?.split(',').includes(user.role));
  }

  async updateField(updateMenuDto: UpdateMenuDto, userInfo: UserInfoDto) {
    const { id, ...updateData } = updateMenuDto;
    const result = await this.menuRepository.update(id, {
      ...updateData,
      updateBy: userInfo.userName,
    });
    if (result.affected === 0) {
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    }
    return null;
  }

  async updateDelete(deleteMenuDto: DeleteMenuDto) {
    const column = await this.menuRepository.update(
      { id: deleteMenuDto.id },
      { isDelete: STATUSTYPE.INACTIVE },
    );
    if (column.affected == 0)
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    return null;
  }
}
