import {
  GetLastMessageByChatRoomIdOutboundPort,
  GetLastMessageByChatRoomIdOutboundPortInputDto,
  GetLastMessageByChatRoomIdOutboundPortOutputDto,
} from '../outbound-port/get-last-message-by-chat-room-id.outbound-port';
import { delay } from '@fxts/core';

export class GetLastMessageByChatRoomIdRepository
  implements GetLastMessageByChatRoomIdOutboundPort
{
  async execute(
    params: GetLastMessageByChatRoomIdOutboundPortInputDto,
  ): Promise<GetLastMessageByChatRoomIdOutboundPortOutputDto> {
    const query = `
    SELECT id, text, chat_room_id
    WHERE chat_messages
    WHERE chat_room_id = ${params.chatRoomId}
    ORDER BY chat_created_ad DESC
    LIMIT 1
    `;

    console.log(query);

    const found = this.mockData.find(
      ({ chatRoomId }) => chatRoomId === params.chatRoomId,
    );

    return delay(1000, found);
  }

  private readonly mockData = [
    {
      id: 100,
      text: 'cool1',
      createdAt: 10000,
      chatRoomId: 1,
    },
    {
      id: 200,
      text: 'cool2',
      createdAt: 6000,
      chatRoomId: 2,
    },
    {
      id: 300,
      text: 'cool3',
      createdAt: 7000,
      chatRoomId: 3,
    },
    {
      id: 400,
      text: 'cool4',
      createdAt: 8000,
      chatRoomId: 4,
    },
    {
      id: 500,
      text: 'cool5',
      createdAt: 4000,
      chatRoomId: 5,
    },
    {
      id: 600,
      text: 'cool6',
      createdAt: 2000,
      chatRoomId: 6,
    },
  ];
}
