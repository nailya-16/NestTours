import { Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ITour } from 'src/interfaces/tour';
import { ValidationParamIdPipe } from 'src/pipes/param-id.pipe';
import { Tour } from 'src/schemas/tour';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {

    constructor(private toursService: ToursService) {}

    @Post()
    initTours(): Promise<ITour[]> {
        this.toursService.generateTours();
        return this.toursService.getAllTours()
    }

    @Delete()
    removeAllTours(): void {
        this.toursService.deleteTours()
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    getAllTours(): Promise<ITour[]> {
        return this.toursService.getAllTours();
    }
    
    @Get(':id')
    getTourById(@Param('id', ValidationParamIdPipe) id: string): Promise<Tour | { message: string }> {
        return this.toursService.getTourById(id);
    }

}
