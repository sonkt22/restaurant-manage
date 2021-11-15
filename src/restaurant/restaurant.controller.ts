import { Body, Controller, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../exception/httpException.filter';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantPipe } from '../lib/validatePipe/restaurant/createRestaurantPipe.class';
import { CreateRestaurantInput, UpdateRestaurantInput } from './restaurant.dto';
import { CheckUUID } from '../lib/validatePipe/uuidPipe.class';

@Controller('restaurant')
@ApiTags('Restaurant')
@UseFilters(new HttpExceptionFilter())
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Post('')
  async createRestaurant(
    @Body(new CreateRestaurantPipe())
    createRestaurantInput: CreateRestaurantInput,
  ) {
    return await this.restaurantService.createRestaurant(createRestaurantInput);
  }
  @Put(':id')
  async updateRestaurant(
    @Param('id', new CheckUUID()) id: string,
    @Body(new CreateRestaurantPipe())
    updateRestaurantInput: UpdateRestaurantInput,
  ) {
    return await this.restaurantService.updateRestaurant(
      id,
      updateRestaurantInput,
    );
  }
}
