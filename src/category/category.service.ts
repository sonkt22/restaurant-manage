import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { IsNull, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryInput } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async createCategory(createCategoryInput: CreateCategoryInput) {
    const existCategory = await this.categoryRepository.findOne({
      where: {
        name: createCategoryInput.name,
        restaurantId: createCategoryInput.restaurantId,
        deletedAt: IsNull(),
      },
    });

    if (existCategory) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'CATEGORY_EXISTED',
        },
        HttpStatus.CONFLICT,
      );
    }

    const existRestaurant = await this.restaurantRepository.findOne({
      where: {
        id: createCategoryInput.restaurantId,
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

    let newCategory = new Category();
    newCategory.setAttributes(createCategoryInput);

    newCategory = await this.categoryRepository.save(newCategory);
    return {
      data: newCategory,
    };
  }

  async getCategoriesByRestaurant(id: string) {
    const categories = await this.categoryRepository.find({
      where: {
        restaurantId: id,
        deletedAt: IsNull(),
      },
    });
    return { data: categories };
  }
}
