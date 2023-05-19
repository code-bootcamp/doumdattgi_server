import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum PRODUCT_CATEGORY_ENUM {
  IT = 'IT',
  DESIGN = 'DESIGN',
  TRANSLATE = 'TRANSLATE',
  VIDEO = 'VIDEO',
  MARKETING = 'MARKETING',
  DOCUMENT = 'DOCUMENT',
}

export enum WORKDAY_STATUS_ENUM {
  WEEKDAY = 'WEEKDAY',
  WEEKEND = 'WEEKEND',
  NEGOTIATION = 'NEGOTIATION',
}

registerEnumType(PRODUCT_CATEGORY_ENUM, {
  name: 'PRODUCT_CATEGORY_ENUM',
});

registerEnumType(WORKDAY_STATUS_ENUM, {
  name: 'WORKDAY_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Product {
  // 상품 ID
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // 유저 정보
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  // 제목
  @Column()
  @Field(() => String)
  title: string;

  // 카테고리
  @Column({ type: 'enum', enum: PRODUCT_CATEGORY_ENUM })
  @Field(() => PRODUCT_CATEGORY_ENUM)
  category: string;

  // 서브 카테고리
  @Column()
  @Field(() => String)
  sub_category: string;

  // 요약
  @Column()
  @Field(() => String)
  summary: string;

  // 본문
  @Column()
  @Field(() => String)
  main_text: string;

  // 구해요/팔아요
  @Column()
  @Field(() => Boolean)
  sellOrBuy: boolean;

  // 생성 날짜
  @CreateDateColumn()
  createdAt: Date;

  // 작업 가능 날짜(주중 / 주말 / 협의)
  @Column({ type: 'enum', enum: WORKDAY_STATUS_ENUM })
  @Field(() => WORKDAY_STATUS_ENUM)
  workDay: string;

  // 시작 작업 가능 시간
  @Column()
  @Field(() => Int)
  startTime: number;

  // 종료 작업 가능 시간
  @Column()
  @Field(() => Int)
  endTime: number;

  // 작업한 시간
  @Column()
  @Field(() => Int)
  workTime: number;

  // 우편번호
  @Column()
  @Field(() => String)
  postNum: string;

  // 도로명 주소
  @Column()
  @Field(() => String)
  roadAddress: string;

  // 상세주소
  @Column()
  @Field(() => String)
  detailAddress: string;

  // 삭제시간
  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}
