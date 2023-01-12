export type FindMembersInboundPortInputDto = void;

export type FindMembersInboundPortOutputDto = Array<{
  name: string;
  email: string;
  phone: string;
}>;

export const FIND_MEMBERS_INBOUND_PORT = 'FIND_MEMBERS_INBOUND_PORT' as const;

export interface FindMembersInboundPort {
  execute(
    params: FindMembersInboundPortInputDto,
  ): Promise<FindMembersInboundPortOutputDto>;
}
