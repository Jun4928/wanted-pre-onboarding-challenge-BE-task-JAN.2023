export type FindChatRoomsByDogIdInboundPortInputDto = {
  dogId: number;
};

export type FindChatRoomsByDogIdInboundPortOutputDto = Array<{
  id: number;
  chatPairDog: {
    id: number;
    name: string;
  };
  lastMessage: {
    id: number;
    text: string;
    createdAt: number;
  };
}>;

export const FIND_CHAT_ROOMS_BY_DOG_ID_INBOUND_PORT =
  'FIND_CHAT_ROOMS_BY_DOG_ID_INBOUND_PORT' as const;

export interface FindChatRoomsByDogIdInboundPort {
  execute(
    params: FindChatRoomsByDogIdInboundPortInputDto,
  ): Promise<FindChatRoomsByDogIdInboundPortOutputDto>;
}
