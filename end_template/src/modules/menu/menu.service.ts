import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    await this.menuRepository.save(createMenuDto);
    return {
      message: '创建成功',
    };
  }

  async getList() {
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
        permission: [],
      };
      for (const itemKey in item) {
        if (data[itemKey] || data[itemKey] === false) {
          item[itemKey] = data[itemKey];
        }
      }
      return item;
    }
    const [data] = await this.menuRepository.findAndCount();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
