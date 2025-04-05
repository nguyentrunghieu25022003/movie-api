import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParamIdDto {
  @ApiProperty()
  @IsString()
  userId: string;
}
