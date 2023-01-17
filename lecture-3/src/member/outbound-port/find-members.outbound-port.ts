export type FindMembersOutboundPortInputDto = void;

export type FindMembersOutboundPortOutputDto = Array<{
  name: string;
  email: string;
  phone: string;
}>;

export const FIND_MEMBERS_OUTBOUND_PORT = 'FIND_MEMBERS_OUTBOUND_PORT' as const;

export interface FindMembersOutboundPort {
  execute(
    params: FindMembersOutboundPortInputDto,
  ): Promise<FindMembersOutboundPortOutputDto>;
}
