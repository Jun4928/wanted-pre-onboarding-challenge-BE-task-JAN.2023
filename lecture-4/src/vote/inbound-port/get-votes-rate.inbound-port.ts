export type GetVotesRateInboundPortInputDto = {
  votes: Array<{ choice: number }>;
  include: Array<number>;
  // exclude: Array<number>;
};

type Rate = {
  [p: string]: number;
};

export type GetVotesRateInboundPortOutputDto = {
  totalCount: number;
  rate: Rate;
};

export const GET_VOTES_RATE_INBOUND_PORT =
  'GET_VOTES_RATE_INBOUND_PORT' as const;

export interface GetVotesRateInboundPort {
  execute(
    params: GetVotesRateInboundPortInputDto,
  ): GetVotesRateInboundPortOutputDto;
}
