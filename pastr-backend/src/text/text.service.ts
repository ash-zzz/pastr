import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { Text } from '../schemas/text.schema';

@Injectable()
export class TextService {
  constructor(
    @InjectModel(Text.name) private textModel: Model<Text>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createUpdate({ path, text }: Text): Promise<Text> {
    if (!path) {
      return null;
    }
    console.log('💾 deleting cached', path);
    this.cacheManager.del(path);
    return this.textModel.findOneAndUpdate(
      { path },
      {
        $set: { text },
      },
      {
        upsert: true,
      },
    );
  }

  async get(path: string): Promise<Text> {
    const cached = await this.cacheManager.get<string>(path);
    console.log('💾 checking', path, 'cache: ', cached);
    if (cached) {
      console.log('💾 returning cached', path, ':', cached);
      return { path, text: cached };
    }
    return (await this.textModel.findOne({ path })) || { path, text: '' };
  }
}
