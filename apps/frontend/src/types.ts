export interface Icon {
    id: number;
    name: string;
    svg: string;
    tags: string;
}

export interface Icons_SearchRes {
    totalHits: number;
    icons: Icon[];
}
