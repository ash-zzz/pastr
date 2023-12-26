import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { Text } from '../schemas/text.schema';
import { TextService } from './text.service';

@Controller('text')
export class TextController {
  constructor(private service: TextService) {}

  @Post()
  @Header('content-type', 'application/json')
  async create(@Body() text: Text) {
    return this.service.createUpdate(text);
  }

  @Get(':path')
  @Header('content-type', 'application/json')
  async get(@Param() { path }: { path: string }): Promise<Text> {
    return this.service.get(path);
  }
}
