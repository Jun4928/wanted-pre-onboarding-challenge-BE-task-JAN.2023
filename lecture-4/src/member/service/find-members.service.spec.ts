import { FindMembersService } from './find-members.service';
import {
  FindMembersOutboundPort,
  FindMembersOutboundPortInputDto,
  FindMembersOutboundPortOutputDto,
} from '../outbound-port/find-members.outbound-port';

class MockFindMembersOutboundPort implements FindMembersOutboundPort {
  private readonly result: FindMembersOutboundPortOutputDto;

  constructor(result: FindMembersOutboundPortOutputDto) {
    this.result = result;
  }

  async execute(
    params: FindMembersOutboundPortInputDto,
  ): Promise<FindMembersOutboundPortOutputDto> {
    return this.result;
  }
}

describe('FindMembersService Spec', () => {
  test('멤버 리스트를 반환한다.', async () => {
    const member = [
      {
        name: 'A',
        email: 'A@gmail.com',
        phone: '0103123123',
      },
    ];

    const findMemberService = new FindMembersService(
      new MockFindMembersOutboundPort(member),
    );

    const res = await findMemberService.execute();

    expect(res).toStrictEqual([
      {
        name: 'A',
        email: 'A@gmail.com',
        phone: '0103123123',
      },
    ]);
  });
});
