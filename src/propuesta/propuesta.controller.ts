import { Controller } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';

@Controller('propuesta')
export class PropuestaController {

    constructor(private readonly propuestaService: PropuestaService) {}
}
