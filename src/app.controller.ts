import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(@Body() payload: any) {
    return this.appService.login(payload);
  }

  @Post('authorize')
  authorize(@Headers('Authorization') authorization) {
    return this.appService.authorize(authorization);
  }
}
