import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryPipe } from '../lib/validatePipe/category/createCategoryPipe.class';
import { HttpExceptionFilter } from '../exception/httpException.filter';
import { CreateCategoryInput } from './category.dto';
import { CategoryService } from './category.service';
import { CheckUUID } from '../lib/validatePipe/uuidPipe.class';

@ApiTags('Category')
@Controller('category')
@UseFilters(new HttpExceptionFilter())
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('')
  async createCategory(
    @Body(new CreateCategoryPipe()) createCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoryService.createCategory(createCategoryInput);
  }

  @Get('/get-categories-by-restaurant/:restaurantId')
  async getCategoriesByRestaurant(
    @Param('restaurantId', new CheckUUID()) restaurantId: string,
  ) {
    return await this.categoryService.getCategoriesByRestaurant(restaurantId);
  }
}
