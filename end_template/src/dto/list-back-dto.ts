import { ApiProperty } from '@nestjs/swagger';

export class ListBackDto {
  @ApiProperty({ description: 'page' })
  page?: number = 1;

  @ApiProperty({ description: 'size' })
  size?: number = 10;

  @ApiProperty({ description: 'total' })
  total?: number = 0;

  @ApiProperty({ description: 'record' })
  record?: Array<any>;
}
