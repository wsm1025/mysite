import {
  Controller,
  Post,
  Body,
  Req,
  UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('验证')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @HttpCode(200)
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() _: LoginDto, @Req() req) {
    // req 守卫会将用户信息放入 req.user local.strategy.ts
    return this.authService.login(req.user);
  }
}
