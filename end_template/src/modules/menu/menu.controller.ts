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
import { OPERATIONTYPE, USERROLRTYPE } from 'src/enum';
import { DeleteMenuDto } from './dto/delete-menu.dto';
import { UserInfoDto } from '../user/dto/user-info.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '创建菜单' })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.MENU_ADD))
  @Post('createMenu')
  create(@Body() createMenuDto: CreateMenuDto, @Req() req) {
    return this.menuService.create(createMenuDto, req.user);
  }

  @ApiOperation({ summary: '获取列表' })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.MENU_LIST))
  @Post('getList')
  findAll(@Req() req) {
    return this.menuService.getList(req.user);
  }

  @ApiOperation({ summary: '更新菜单某些值' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.MENU_EDIT))
  @Post('/field')
  updateField(@Body() body: UpdateMenuDto, @Req() req) {
    return this.menuService.updateField(body, req.user);
  }

  @ApiOperation({ summary: '删除菜单' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.MENU_DELETE))
  @Post('/delete')
  updateDelete(@Body() DeleteMenuDto: DeleteMenuDto) {
    return this.menuService.updateDelete(DeleteMenuDto);
  }
}
