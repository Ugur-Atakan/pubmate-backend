import { Controller } from '@nestjs/common';
import { IsletmelerService } from './isletmeler.service';
import { Isletmeler } from './entities/isletmeler.entity';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: Isletmeler,
  },
})
@Controller('isletmeler')
export class IsletmelerController implements CrudController<Isletmeler> {
  constructor(public service: IsletmelerService) {}
}
