import {
  GetVotesRateInboundPort,
  GetVotesRateInboundPortInputDto,
  GetVotesRateInboundPortOutputDto,
} from '../inbound-port/get-votes-rate.inbound-port';
import {
  countBy,
  entries,
  filter,
  fromEntries,
  map,
  pipe,
  toArray,
} from '@fxts/core';

export class GetVotesRateService implements GetVotesRateInboundPort {
  execute(
    params: GetVotesRateInboundPortInputDto,
  ): GetVotesRateInboundPortOutputDto {
    const filtered = pipe(
      params.votes,
      filter(({ choice }) => params.include.includes(choice)),
      toArray,
    );

    const totalCount = filtered.length;

    const rate = pipe(
      filtered,
      countBy((e) => e.choice),
      entries,
      map(([choice, count]) => [choice, this.getRate(count, totalCount)]),
      toArray,
      (rates) => fromEntries(rates as [string, number][]),
    );

    return {
      totalCount,
      rate,
    };
  }

  private getRate(count: number, totalCount: number): number {
    const num = (count / totalCount) * 100;
    return Math.round(num * 100) / 100;
  }
}
