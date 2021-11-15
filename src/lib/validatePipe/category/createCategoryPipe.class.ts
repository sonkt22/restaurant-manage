import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCategoryInput } from '../../../category/category.dto';
import { checkUUID } from '../uuidValidate';

@Injectable()
export class CreateCategoryPipe implements PipeTransform<any> {
  async transform(value: CreateCategoryInput) {
    if (!value.name) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'CATEGORY_NAME_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!checkUUID(value.restaurantId)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'RESTAURANT_ID_NOT_VALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
