import { PartialType } from '@nestjs/swagger';
import { Menu } from '../entities/menu.entity';

export class CreateMenuDto extends PartialType(Menu) {}
