import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurantInput {
  @ApiProperty({ required: false })
  readonly name: string;
}

export class CreateRestaurantInput {
  @ApiProperty()
  readonly name: string;
}
