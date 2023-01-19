import { GetVotesRateService } from './get-votes-rate.service';

describe('GetVotesRateService Spec', () => {
  test('정상 비율을 리턴한다.', () => {
    const getVotesRateService = new GetVotesRateService();

    const result = getVotesRateService.execute({
      votes: [
        {
          choice: 1,
        },
        {
          choice: 2,
        },
        {
          choice: 2,
        },
        {
          choice: 3,
        },
        {
          choice: 3,
        },
        {
          choice: 3,
        },
        {
          choice: 4,
        },
        {
          choice: 4,
        },
        {
          choice: 4,
        },
        {
          choice: 4,
        },
        {
          choice: 5,
        },
        {
          choice: 8,
        },
        {
          choice: 10,
        },
      ],
      include: [3, 5],
    });

    expect(result).toStrictEqual({
      totalCount: 4,
      rate: {
        3: 75,
        5: 25,
      },
    });
  });
});
