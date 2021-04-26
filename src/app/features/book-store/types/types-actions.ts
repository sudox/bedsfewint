import { BookEntity } from "../reducers/books.reducer";
import { StoreDataResponse } from "./types-store";




export interface BooksStoreDataActionPayload extends StoreDataResponse<BookEntity> {

}
