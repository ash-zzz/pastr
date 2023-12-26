import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Text, TextSchema } from '../schemas/text.schema';
import { TextController } from './text.controller';
import { TextService } from './text.service';
import { TextGateway } from './text.gateway';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Text.name, schema: TextSchema }]),
    CacheModule.register(),
  ],
  controllers: [TextController],
  providers: [TextService, TextGateway],
})
export class TextModule {}
