import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entites/product.entity';
import { User } from '../users/entities/user.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { UsersService } from '../users/users.service';
import { Payment } from '../payment/entities/payment.entity';
import { Request } from '../request/entites/request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      Product, //
      User,
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
    UsersService,
  ],
})
export class ProductModule {}
