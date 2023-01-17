import { FindAppIdService } from './find-app-id.service';
import {
  GoogleSearchByKeywordOutboundPort,
  GoogleSearchByKeywordOutboundPortInputDto,
  GoogleSearchByKeywordOutboundPortOutputDto,
} from '../outbound-port/google-search-by-keyword.outbound-port';

class MockGoogleSearchByKeywordOutboundPort
  implements GoogleSearchByKeywordOutboundPort
{
  private readonly result: GoogleSearchByKeywordOutboundPortOutputDto;

  constructor(result: GoogleSearchByKeywordOutboundPortOutputDto) {
    this.result = result;
  }

  async execute(
    params: GoogleSearchByKeywordOutboundPortInputDto,
  ): Promise<GoogleSearchByKeywordOutboundPortOutputDto> {
    return this.result;
  }
}

describe('FindAppIdService Spec', () => {
  test('9자리 또는 10자리 APP ID의 배열을 반환한다.', async () => {
    const findAppIdService = new FindAppIdService(
      new MockGoogleSearchByKeywordOutboundPort({
        items: [
          {
            link: 'https://apps.apple.com/us/app/notability/id360593530',
          },
          {
            link: 'https://apps.apple.com/us/app/notability/id123456789',
          },
          {
            link: 'https://apps.apple.com/us/app/notability/id12345678901',
          },
          {
            link: 'https://apps.apple.com/us/app/notability/id12345',
          },
          {
            link: 'notability/id393939399',
          },
        ],
      }),
    );

    const result = await findAppIdService.execute({ keyword: 'google' });

    expect(result).toStrictEqual(['360593530', '123456789']);
  });

  test('9자리 또는 10자리 APP ID의 배열을 반환한다. 중복을 제거한다.', async () => {
    const findAppIdService = new FindAppIdService(
      new MockGoogleSearchByKeywordOutboundPort({
        items: [
          {
            link: 'https://apps.apple.com/us/app/notability/id360593530',
          },
          {
            link: 'https://apps.apple.com/us/app/notability/id360593530',
          },
          {
            link: 'https://apps.apple.com/us/app/notability/id123456789',
          },
          {
            link: 'https://apps.apple.com/us/app/notability/id123456789',
          },
          {
            link: 'https://apps.apple.com/us/app/notability/id12345678901',
          },
          {
            link: 'https://apps.apple.com/us/app/notability/id12345',
          },
        ],
      }),
    );

    const result = await findAppIdService.execute({ keyword: 'google' });

    expect(result).toStrictEqual(['360593530', '123456789']);
  });

  test('google search engine 이 null 을 리턴할 때, 빈 배열을 반환한다.', async () => {
    const findAppIdService = new FindAppIdService(
      new MockGoogleSearchByKeywordOutboundPort(null),
    );

    const result = await findAppIdService.execute({ keyword: 'google' });

    expect(result).toStrictEqual([]);
  });
});
