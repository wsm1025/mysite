import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
  Req,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleInterceptor } from 'src/core/interceptor/user.interceptor';
import { OPERATIONTYPE, USERROLRTYPE } from 'src/enum';
import { Roles } from 'src/auth/roles/roles.decorator';

@ApiTags('字典值')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @ApiOperation({ summary: '新建字典' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.DICTIONARY_ADD))
  @Post('createDic')
  create(@Body() createDictionaryDto: CreateDictionaryDto, @Req() req) {
    return this.dictionaryService.create(createDictionaryDto, req.user);
  }

  @ApiOperation({ summary: '传入父级别id 查询子级字典' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/findDicByParentName/:name')
  findDicByParentName(@Param('name') name: string) {
    return this.dictionaryService.findDicByParentName(name);
  }

  @ApiOperation({ summary: '查找单个字典' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.dictionaryService.findOne(id);
  }

  @ApiOperation({ summary: '查找所有字典' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.DICTIONARY_LIST))
  @Get('findAll')
  findAll(@Query('parentType') parentType, @Query('keyWord') keyWord?: string) {
    return this.dictionaryService.findAll(parentType, keyWord);
  }

  @ApiOperation({ summary: '删除字典' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.DICTIONARY_DELETE))
  @Post('/delete')
  @Roles([USERROLRTYPE.USER])
  updateDelete(@Body('id') id: string) {
    return this.dictionaryService.updateDelete(id);
  }

  @ApiOperation({ summary: '更新字典某些值' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new RoleInterceptor(OPERATIONTYPE.DICTIONARY_EDIT))
  @Post('/field')
  updateField(@Body('id') id, @Body() body) {
    return this.dictionaryService.updateField(id, body);
  }
}
