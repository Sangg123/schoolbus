import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, string> {
    return { 'Hello World!': 'School Bus Management API is running!' };
  }
}
