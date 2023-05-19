import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { IamportService } from '../iamport/import.service';
import { Payment } from './entities/payment.entity';
import { PaymentsResolver } from './payment.resolver';
import { PaymentsService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment, //
      User,
    ]),
  ],
  providers: [
    PaymentsResolver, //
    PaymentsService,
    IamportService,
  ],
})
export class PaymentsModule {}
