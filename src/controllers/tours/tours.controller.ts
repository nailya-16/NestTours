import { Controller } from '@nestjs/common';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {

    constructor(private toursService: ToursService) {}
}
