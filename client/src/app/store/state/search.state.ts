export interface ISearch {
    index: string;
    type: string;
    body: {};
    results: any;
}

export interface ISearches extends Array<ISearch>{}
export const INITIAL_SEARCH_STATE: ISearches = [];