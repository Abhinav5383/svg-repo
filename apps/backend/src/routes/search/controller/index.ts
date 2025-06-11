import sqlite from "~/db/sqlite";

const searchIcon_statement = sqlite.prepare(`
    SELECT * FROM icons
    WHERE name LIKE $query
    OR tags LIKE $query
`);

interface DbIconItem {
    id: number;
    name: string;
    svg: string;
    tags: string | null;
}

export function SearchIcons(query: string, page: number, itemsPerPage: number) {
    const res = searchIcon_statement.all({ $query: `%${query}%` }) as DbIconItem[];
    if (!res) return [];

    return {
        icons: res.slice(itemsPerPage * (page - 1), itemsPerPage * page),
        totalHits: res.length,
    };
}
