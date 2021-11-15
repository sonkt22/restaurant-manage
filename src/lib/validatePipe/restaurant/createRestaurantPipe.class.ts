import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateRestaurantInput } from '../../../restaurant/restaurant.dto';

@Injectable()
export class CreateRestaurantPipe implements PipeTransform<any> {
  async transform(value: CreateRestaurantInput) {
    if (!value.name) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'RESTAURANT_NAME_REQUIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
