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
import { USERROLRTYPE } from 'src/enum';

@ApiTags('字典值')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @ApiOperation({ summary: '新建字典' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
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

  @ApiOperation({ summary: '查找所有字典' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('findAll')
  findAll(@Query('parentType') parentType, @Query('keyWord') keyWord?: string) {
    return this.dictionaryService.findAll(parentType, keyWord);
  }

  @ApiOperation({ summary: '删除字典' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RoleInterceptor(USERROLRTYPE.ADMIN))
  @Post('/delete')
  updateDelete(@Body('id') id: string) {
    return this.dictionaryService.updateDelete(id);
  }

  @ApiOperation({ summary: '更新字典某些值' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/field')
  updateField(@Body() body) {
    return this.dictionaryService.updateField(body);
  }
}
