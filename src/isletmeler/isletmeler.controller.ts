import { Controller } from '@nestjs/common';
import { IsletmelerService } from './isletmeler.service';
import { Isletmeler } from './entities/isletmeler.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { IsletmelerDTO } from 'src/dtos/isletme.dto';
@Crud({
  model: {
    type: IsletmelerDTO,
  },
})
@Controller('isletmeler')
export class IsletmelerController implements CrudController<Isletmeler> {
  constructor(public service: IsletmelerService) {}
}
