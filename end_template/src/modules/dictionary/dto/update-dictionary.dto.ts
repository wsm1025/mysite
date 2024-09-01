import { PartialType } from '@nestjs/swagger';
import { CreateDictionaryDto } from './create-dictionary.dto';
import { PARENTTYPE, STATUSTYPE } from 'src/enum';

export class UpdateDictionaryDto extends PartialType(CreateDictionaryDto) {
  id: string;
  status?: STATUSTYPE;
  dictionaryName?: string;
  dictionaryDesc?: string;
  parentId?: string;
  parentType?: PARENTTYPE;
}
