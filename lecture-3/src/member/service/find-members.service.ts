import {
  FindMembersInboundPort,
  FindMembersInboundPortInputDto,
  FindMembersInboundPortOutputDto,
} from '../inbound-port/find-members.inbound-port';
import { Inject } from '@nestjs/common';
import {
  FIND_MEMBERS_OUTBOUND_PORT,
  FindMembersOutboundPort,
} from '../outbound-port/find-members.outbound-port';

export class FindMembersService implements FindMembersInboundPort {
  constructor(
    @Inject(FIND_MEMBERS_OUTBOUND_PORT)
    private readonly findMembersOutboundPort: FindMembersOutboundPort,
  ) {}

  async execute(
    params: FindMembersInboundPortInputDto,
  ): Promise<FindMembersInboundPortOutputDto> {
    return this.findMembersOutboundPort.execute();
  }
}
