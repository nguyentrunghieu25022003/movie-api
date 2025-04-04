import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { paramCase } from 'param-case';

export class GetMovieDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) =>
    paramCase(value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')),
  )
  name: string;
}
