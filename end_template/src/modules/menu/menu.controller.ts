import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleInterceptor } from 'src/core/interceptor/user.interceptor';
import { USERROLRTYPE } from 'src/enum';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '创建菜单' })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(USERROLRTYPE.ADMIN))
  @Post('craeteMenu')
  create(@Body() createMenuDto: CreateMenuDto, @Req() req) {
    return this.menuService.create(createMenuDto, req.user);
  }

  @ApiOperation({ summary: '获取列表' })
  @UseGuards(AuthGuard('jwt'))
  @Post('getList')
  findAll() {
    return this.menuService.getList();
  }

  @ApiOperation({ summary: '更新字典某些值' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(USERROLRTYPE.ADMIN))
  @Post('/field')
  updateField(@Body() body, @Req() req) {
    return this.menuService.updateField(body, req.user);
  }
}
