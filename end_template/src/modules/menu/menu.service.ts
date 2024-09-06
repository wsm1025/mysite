import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { ApiErrCode, ApiException } from 'src/core/exceptions/api.exception';
import { UserInfoDto } from '../user/dto/user-info.dto';
import { STATUSTYPE } from 'src/enum';
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
    const newMenu = await this.menuRepository.create({
      ...createMenuDto,
      createBy: userInfo.userName,
      updateBy: userInfo.userName,
    });
    let column;
    try {
      column = await this.menuRepository.save(newMenu);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    console.log(column);
    if (column.affected === 0)
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
    return null;
  }

  async getList() {
    const [data] = await this.menuRepository.findAndCount({
      where: { isDelete: STATUSTYPE.ACTIVE },
      order: { order: 'ASC' },
    });
    return data;
  }

  async updateField(updateMenuDto: UpdateMenuDto, userInfo: UserInfoDto) {
    const {
      id,
      title,
      path,
      file,
      icon,
      isIframe,
      url,
      shows,
      keepAlive,
      tabFix,
      tabHidden,
      order,
      permission,
    } = updateMenuDto;

    const updateData: Omit<UpdateMenuDto, 'id'> = {
      title,
      path,
      file,
      icon,
      isIframe,
      url,
      shows,
      keepAlive,
      tabFix,
      tabHidden,
      order,
      permission,
    };
    let column;
    try {
      column = await this.menuRepository.update(
        { id },
        {
          ...updateData,
          createBy: userInfo.userName,
          updateBy: userInfo.userName,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (column.affected === 0)
      throw new ApiException(ApiErrCode.OPERATION_FAILED);
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
