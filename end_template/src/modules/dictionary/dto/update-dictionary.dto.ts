import { IsNotEmpty } from 'class-validator';
import { PARENTTYPE, STATUSTYPE } from 'src/enum';

export class UpdateDictionaryDto {
  id: string;
  status: STATUSTYPE;
  dictionaryName: string;
  dictionaryDesc?: string;
  parentId?: string;
  parentType: PARENTTYPE;
}
