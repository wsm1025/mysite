import { PARENTTYPE, STATUSTYPE } from 'src/enum';

export class UpdateDictionaryDto {
  id: string;
  status: STATUSTYPE;
  dictionaryName: string;
  dictionaryDesc?: string;
  pid?: string;
  parentType: PARENTTYPE;
}
