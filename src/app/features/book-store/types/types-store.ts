import { Link } from "../models";


export interface HypermediaEntity {
  links: Link[]
}

export interface StoreDataResponse<T extends HypermediaEntity> extends HypermediaEntity {
  data: T[]
}
