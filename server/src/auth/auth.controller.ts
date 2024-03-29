import { AuthService } from './auth.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/interface/user.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('用户验证模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: '用户注册',
  })
  async registerUser(@Body() userDto: User) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  public async userLogin(@Body() userDto: User) {
    return await this.authService.login(userDto);
  }

  @Post('alter')
  @ApiOperation({
    summary: '用户密码修改接口',
  })
  async alterUser(@Body() userDto: User) {
    return await this.authService.alter(userDto);
  }

  @Get('captcha/:id')
  @ApiOperation({
    summary: '获取注册验证码',
  })
  async getCaptcha(@Param('id') id: string) {
    return await this.authService.createCaptcha(id);
  }

  @Post('validateCode')
  @ApiOperation({
    summary: '获取注册验证码',
  })
  async validateCode(@Body() captcha: { code: string; id: string }) {
    const { code, id } = captcha;
    return await this.authService.validateCode(code, id);
  }
}
