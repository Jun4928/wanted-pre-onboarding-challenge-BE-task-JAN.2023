export type GetChatRoomsOutboundPortInputDto = {
  where: { dogId: number } | { chatPairId: number };
};

export type GetChatRoomsOutboundPortOutputDto = Array<{
  id: number;
  pairDogId: number;
  pairDogName: string;
}>;

export const GET_CHAT_ROOMS_OUTBOUND_PORT =
  'GET_CHAT_ROOMS_OUTBOUND_PORT' as const;

export interface GetChatRoomsOutboundPort {
  execute(
    params: GetChatRoomsOutboundPortInputDto,
  ): Promise<GetChatRoomsOutboundPortOutputDto>;
}
