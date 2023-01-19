export type GoogleSearchByKeywordOutboundPortInputDto = {
  keyword: string;
};

export type GoogleSearchByKeywordOutboundPortOutputDto = {
  items: Array<{
    link: string;
  }>;
} | null;

export const GOOGLE_SEARCH_BY_KEYWORD_OUTBOUND_PORT =
  'GOOGLE_SEARCH_BY_KEYWORD_OUTBOUND_PORT ' as const;

export interface GoogleSearchByKeywordOutboundPort {
  execute(
    params: GoogleSearchByKeywordOutboundPortInputDto,
  ): Promise<GoogleSearchByKeywordOutboundPortOutputDto>;
}

// class GoogleSearchByKeywordOutboundAdapter
//     implements GoogleSearchByKeywordOutboundPort {
//   constructor(httpService) {
//   }
//
//   execute(
//       params: GoogleSearchByKeywordOutboundPortInputDto,
//   ): Promise<GoogleSearchByKeywordOutboundPortOutputDto> {
//
//     // this.httpservice.axi
//     try {
//       await this.httpservice.axiosRef.get(
//           `https://www.googleapis.com/customsearch/v1/siterestrict?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_ENGINE_ID}&q=${search}`,
//       );
//     } catch (e) {
//       if (e instanceof GoogleCustomError) {
//         return null;
//
//       }
//
//       throw e;
//     }
//   }
// }
