import {
  GetChatRoomsOutboundPort,
  GetChatRoomsOutboundPortInputDto,
  GetChatRoomsOutboundPortOutputDto,
} from '../outbound-port/get-chat-rooms.outbound-port';

export class GetChatRoomsRepository implements GetChatRoomsOutboundPort {
  async execute(
    params: GetChatRoomsOutboundPortInputDto,
  ): Promise<GetChatRoomsOutboundPortOutputDto> {
    const baseQuery = `
      SELECT cr.id, d.id, d.name
      FROM chat_rooms AS cr`;

    const { where } = params;

    if ('dogId' in where) {
      const query = `
      ${baseQuery}
      INNER JOIN dogs AS d ON d.id = cr.chat_pair_id
      WHERE cr.dog_id = ${where.dogId}
      `;

      console.log(query);

      return this.asHost;
    }

    if ('chatPairId' in where) {
      const query = `
      ${baseQuery}
      INNER JOIN dogs AS d ON d.id = cr.dog_id
      WHERE cr.chat_pair_id = ${where.chatPairId}
      `;

      console.log(query);

      return this.asGuest;
    }

    throw TypeError(`DO NOT SUPPORT ${where}`);
  }

  private readonly asHost = [
    {
      id: 1,
      pairDogId: 4,
      pairDogName: 'A',
    },
    {
      id: 2,
      pairDogId: 5,
      pairDogName: 'B',
    },
    {
      id: 3,
      pairDogId: 6,
      pairDogName: 'C',
    },
  ];

  private readonly asGuest = [
    {
      id: 4,
      pairDogId: 7,
      pairDogName: 'D',
    },
    {
      id: 5,
      pairDogId: 8,
      pairDogName: 'E',
    },
    {
      id: 6,
      pairDogId: 9,
      pairDogName: 'F',
    },
  ];
}
