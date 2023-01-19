export type GetLastMessageByChatRoomIdOutboundPortInputDto = {
  chatRoomId: number;
};

export type GetLastMessageByChatRoomIdOutboundPortOutputDto = {
  id: number;
  text: string;
  createdAt: number;
  chatRoomId: number;
};

export const GET_LAST_MESSAGE_BY_CHAT_ROOM_ID_OUTBOUND_PORT =
  'GET_LAST_MESSAGE_BY_CHAT_ROOM_ID_OUTBOUND_PORT' as const;

export interface GetLastMessageByChatRoomIdOutboundPort {
  execute(
    params: GetLastMessageByChatRoomIdOutboundPortInputDto,
  ): Promise<GetLastMessageByChatRoomIdOutboundPortOutputDto>;
}
