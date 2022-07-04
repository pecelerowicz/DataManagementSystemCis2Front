export interface GetSearchListRequest {
    userName: string;
    hasInfo: boolean;
    hasDifrInfo: boolean;
    hasTestInfo: boolean;
}

export interface SearchResponse {
    name: string;
    username: string;
    hasStorage: boolean;
    localDate: string;
}

export interface GetSearchListResponse {
    searchResponseList: SearchResponse[];
}