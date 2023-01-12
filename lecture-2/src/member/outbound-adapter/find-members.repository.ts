import {
  FindMembersOutboundPort,
  FindMembersOutboundPortInputDto,
  FindMembersOutboundPortOutputDto,
} from '../outbound-port/find-members.outbound-port';
import { MemoryDatabase } from '../../lib/memory-database';

export class FindMembersRepository implements FindMembersOutboundPort {
  async execute(
    params: FindMembersOutboundPortInputDto,
  ): Promise<FindMembersOutboundPortOutputDto> {
    const members = await MemoryDatabase.findMembers();

    return members.map((member) => {
      return {
        name: member.name,
        email: member.email,
        phone: member.phone,
      };
    });
  }
}
