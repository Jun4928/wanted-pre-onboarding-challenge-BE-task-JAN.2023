import { Controller, Get, Inject } from '@nestjs/common';
import {
  FIND_MEMBERS_INBOUND_PORT,
  FindMembersInboundPort,
} from '../inbound-port/find-members.inbound-port';

@Controller()
export class GetMembersController {
  constructor(
    @Inject(FIND_MEMBERS_INBOUND_PORT)
    private readonly findMembersInboundPort: FindMembersInboundPort,
  ) {}

  @Get('/members')
  async handle() {
    return this.findMembersInboundPort.execute();
  }
}
