import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantInput } from './restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async createRestaurant(createRestaurantInput: CreateRestaurantInput) {
    const existRestaurant = await this.restaurantRepository.findOne({
      where: {
        name: createRestaurantInput.name,
        deletedAt: IsNull(),
      },
    });

    if (existRestaurant) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'RESTAURANT_EXISTED',
        },
        HttpStatus.CONFLICT,
      );
    }

    let newRestaurant = new Restaurant();
    newRestaurant.setAttributes(createRestaurantInput);

    newRestaurant = await this.restaurantRepository.save(newRestaurant);
    return {
      data: newRestaurant,
    };
  }

  async updateRestaurant(
    id: string,
    createRestaurantInput: CreateRestaurantInput,
  ) {
    let existRestaurant = await this.restaurantRepository.findOne({
      where: {
        name: createRestaurantInput.name,
        id: Not(id),
        deletedAt: IsNull(),
      },
    });
    if (existRestaurant) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'RESTAURANT_EXISTED',
        },
        HttpStatus.CONFLICT,
      );
    }

    existRestaurant = await this.restaurantRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull(),
      },
    });

    if (!existRestaurant) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'RESTAURANT_NOT_EXIST',
        },
        HttpStatus.CONFLICT,
      );
    }

    existRestaurant.setAttributes(createRestaurantInput);

    existRestaurant = await this.restaurantRepository.save(existRestaurant);
    return {
      data: existRestaurant,
    };
  }
}
