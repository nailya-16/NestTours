import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/static/private/constants';
import { JwtStrategyService } from 'src/services/Authentication/jwt-strategy/jwt-strategy.service';
import { ToursController } from './tours.controller';
import { Tour, TourSchema } from 'src/schemas/tour';
import { ToursService } from 'src/services/tours/tours.service';

@Module({
    controllers: [ToursController],
    imports: [
        MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
        PassportModule,
        JwtModule.register({
      secret: jwtConstants.secret
    }),
  ],
  providers: [ToursService, JwtStrategyService],
})
export class ToursModule {}