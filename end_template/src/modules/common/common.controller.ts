import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { CreateCommonDto } from './dto/create-common.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { COMMONTYPE } from 'src/enum';

@Controller('common')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('log')
  create(@Body() createCommonDto: CreateCommonDto, @Req() req) {
    return this.commonService.create(createCommonDto, req.user);
  }

  @Get('log')
  findAll() {
    return this.commonService.findAll();
  }

  @Get('log:id')
  findOne(@Param('id') id: string) {
    return this.commonService.findOne(+id);
  }

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Req() req) {
    this.create(
      {
        type: COMMONTYPE.UPLOADFILE,
        info: {
          originalname: file.originalname,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
        },
      },
      req,
    );
    return {
      url: 'http://localhost:3000/public/' + file.filename,
    };
  }
}
