import {query} from "./query";
export interface SearchSchema {

    index: string,
    type: string
    body:  query
}