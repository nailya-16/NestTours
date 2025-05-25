import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TourDto } from 'src/dto/tour-dto';
import { Tour, TourDocument } from 'src/schemas/tour';

@Injectable()
export class ToursService {
    private toursCount = 10;

    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

    generateTours(): void {
        for (let i = 0; i <= this.toursCount; i++) {
            const tour = new TourDto('test'+i, 'test desc', 'test operator', '300'+i)
            const tourData = new this.tourModel(tour);
            tourData.save();
        }
    }

    async deleteTours(): Promise<any> {
        return this.tourModel.deleteMany({})
    }
}
