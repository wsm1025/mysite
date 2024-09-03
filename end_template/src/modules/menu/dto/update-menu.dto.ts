import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  id: string;
  title: string;
  path?: string;
  file?: string;
  icon?: string;
  isIframe?: boolean;
  url?: string;
  shows?: boolean;
  keepAlive: boolean;
  tabFix: boolean;
  tabHidden: boolean;
  order: number;
  permission?: string;
}
