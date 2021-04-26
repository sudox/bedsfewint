export interface HalResponseWithTypedEmbed<T extends HalResponse> {
  _links: HalLink[],
  _embedded: T[]
}

export interface HalResponse {
  _links: HalLink[];
  _embedded: HalResponse[];
}


export interface HalLink {
  rel: string;
  href: string;
}
