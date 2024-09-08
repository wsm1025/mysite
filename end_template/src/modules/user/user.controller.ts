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
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @UseInterceptors(ClassSerializerInterceptor) // 不包含密码 @Exclude()的字段
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @ApiOperation({ summary: '更新用户' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.USER_EDIT))
  @Post('update')
  update(@Body() updateUser: UpdateUserDto) {
    return this.userService.update(updateUser);
  }

  @ApiOperation({ summary: '删除用户' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.USER_DELETE))
  @Post('deleteUser')
  delete(@Body('userId') userId) {
    return this.userService.delete(userId);
  }

  @ApiOperation({ summary: '获取全部用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.USER_LIST))
  @Get('getAllUser')
  async getAllUser(
    @Query() query: Pick<UserInfoDto, 'userName' | 'role'> & FindLimitDto,
  ) {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: '获取单个用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.USER_LIST))
  @Get('userInfo')
  async getUserInfo(@Req() req) {
    return this.userService.findOne(req.param.userId);
  }
}
