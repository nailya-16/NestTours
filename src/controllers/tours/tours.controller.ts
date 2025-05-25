import { Controller, Get, Param } from '@nestjs/common';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {

    constructor(private toursService: ToursService) {}

    //@UseGuards(JwtAuthGuard)
    @Get()
    getAllTours(): void {
        this.toursService.generateTours();
    }
    @Get(':remove')
    removeAllTours(@Param('remove') remove): void {
        this.toursService.deleteTours();
    }
}
