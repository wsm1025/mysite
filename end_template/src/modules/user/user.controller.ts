import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OPERATIONTYPE } from 'src/enum';
import { RoleInterceptor } from 'src/core/interceptor/user.interceptor';
import { FindLimitDto } from 'src/dto/find-limit-dto';

@ApiTags('用户')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @ApiOperation({ summary: '更新用户' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.USER_EDIT))
  @Post('editUser')
  update(@Body() updateUser: UpdateUserDto) {
    return this.userService.update(updateUser);
  }

  @ApiOperation({ summary: '删除用户' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.USER_DELETE))
  @Delete('deleteUser')
  delete(@Query('userId') userId, @Req() req) {
    return this.userService.delete(userId, req.user);
  }

  @ApiOperation({ summary: '获取全部用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.USER_LIST))
  @Get('getAllUser')
  getAllUser(
    @Query() query: Pick<UserInfoDto, 'userName' | 'role'> & FindLimitDto,
  ) {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: '获取单个用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.USER_ONE))
  @Get('userInfo')
  getUserInfo(@Req() req) {
    return this.userService.findOne(req.user.userId);
  }

  @ApiOperation({ summary: '获取页面权限' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('operationList')
  getOpreation() {
    return this.userService.getOperationList();
  }
}
