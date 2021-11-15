import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryInput {
  @ApiProperty({ required: false })
  readonly name: string;
}

export class CreateCategoryInput {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly restaurantId: string;
}
