import {
  FindAppIdInboundPort,
  FindAppIdInboundPortInputDto,
  FindAppIdInboundPortOutputDto,
} from '../inbound-port/find-app-id.inbound-port';
import { Inject } from '@nestjs/common';
import {
  GOOGLE_SEARCH_BY_KEYWORD_OUTBOUND_PORT,
  GoogleSearchByKeywordOutboundPort,
} from '../outbound-port/google-search-by-keyword.outbound-port';
import { head, map, uniq, pipe, reject, toArray, filter } from '@fxts/core';

export class FindAppIdService implements FindAppIdInboundPort {
  constructor(
    @Inject(GOOGLE_SEARCH_BY_KEYWORD_OUTBOUND_PORT)
    private readonly googleSearchByKeywordOutboundPort: GoogleSearchByKeywordOutboundPort,
  ) {}

  async execute(
    params: FindAppIdInboundPortInputDto,
  ): Promise<FindAppIdInboundPortOutputDto> {
    try {
      const searchResult = await this.googleSearchByKeywordOutboundPort.execute(
        {
          keyword: params.keyword,
        },
      );

      if (searchResult === null) {
        return [];
      }

      return pipe(
        searchResult.items,
        map((item) => item.link),
        filter((link) => link.includes('https://apps.apple.com')),
        map((link) => link.match(/[0-9]+/gi)),
        map(head),
        reject((appId) => appId.length > 11),
        reject((appId) => appId.length < 9),
        uniq,
        toArray,
      );
    } catch (e) {
      throw e;
    }
  }
}
