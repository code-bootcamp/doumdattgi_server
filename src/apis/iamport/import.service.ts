import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import axios from 'axios';

import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Payment } from '../payment/entities/payment.entity';
import {
  IIamportServiceCancel,
  IIamportServiceCheckpaid,
} from './interfaces/iamport-service.interface';

@Injectable()
export class IamportService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getToken(): Promise<string> {
    try {
      const getToken = await axios({
        url: 'https://api.iamport.kr/users/getToken',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          imp_key: process.env.IMP_KEY,
          imp_secret: process.env.IMP_SECRET,
        },
      });

      return getToken.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkPid({
    payment_impUid,
    payment_amount,
  }: IIamportServiceCheckpaid): Promise<void> {
    try {
      const token = await this.getToken();
      const getPaymentData = await axios.get(
        `https://api.iamport.kr/payments/${payment_impUid}`,
        { headers: { Authorization: token } },
      );
      if (payment_amount !== getPaymentData.data.response.amount) {
        throw new UnprocessableEntityException('잘못된 결제 정보입니다.');
      }
      return getPaymentData.data.response;
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async cancel({ payment_impUid }: IIamportServiceCancel): Promise<number> {
    try {
      const token = await this.getToken();

      const result = await axios.post(
        'https://api.iamport.kr/payments/cancel',
        {
          imp_uid: payment_impUid,
        },
        {
          headers: { Authorization: token },
        },
      );
      return result.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}
