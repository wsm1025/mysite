import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
  Req,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ListDicDto } from './dto/dictionary-info.dto';
import { StatusType } from './entities/dictionary.entity';

@ApiTags('字典值')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('createDic')
  create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionaryDto);
  }
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.dictionaryService.findOne(id);
  }
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  findByPage(@Query() query: ListDicDto) {
    return this.dictionaryService.findAll(query);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  updateDelete(@Req() req, @Param('id') id: string) {
    return this.dictionaryService.updateDelete(req.user, id);
  }
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Post('/status/:id')
  updateStatus(@Param('id') id: string, @Body('status') status: StatusType) {
    return this.dictionaryService.updateStatus(id, status);
  }
}
