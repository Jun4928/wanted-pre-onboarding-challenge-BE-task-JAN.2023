import { Module } from '@nestjs/common';
import { GetMembersController } from './controller/get-members.controller';
import { FIND_MEMBERS_INBOUND_PORT } from './inbound-port/find-members.inbound-port';
import { FindMembersService } from './service/find-members.service';
import { FIND_MEMBERS_OUTBOUND_PORT } from './outbound-port/find-members.outbound-port';
import { FindMembersRepository } from './outbound-adapter/find-members.repository';

// 오늘 할 것: member 의 리스트를 조회하는 API 작성
@Module({
  controllers: [GetMembersController],
  providers: [
    // inbound-port
    {
      provide: FIND_MEMBERS_INBOUND_PORT,
      useClass: FindMembersService,
    },

    // outbound-port
    {
      provide: FIND_MEMBERS_OUTBOUND_PORT,
      useClass: FindMembersRepository,
    },
  ],
})
export class MemberModule {}
