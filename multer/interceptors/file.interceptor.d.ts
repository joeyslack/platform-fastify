import { MulterOptions } from '../interfaces/multer-options.interface';
import { NestInterceptor, Type } from '@nestjs/common';
export declare function FileInterceptor(fieldName: string, localOptions?: MulterOptions): Type<NestInterceptor>;
