import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  react(@Res() res: Response) {
    return res.sendFile('./index.html', {
      root: join(__dirname, '..', 'public'),
    });
  }
}
