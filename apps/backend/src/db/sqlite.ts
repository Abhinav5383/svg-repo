import { Database } from "bun:sqlite";

const iconsJson = import("./../../data/icons.json");

let sqlite: Database;
// @ts-ignore
if (process.env.NODE_ENV === "development" && global.sqlite) {
    // @ts-ignore
    sqlite = global.sqlite
} else {
    sqlite = new Database();
    // @ts-ignore
    global.sqlite = sqlite;
    sqlite.exec("PRAGMA journal_mode = WAL;");

    sqlite.exec(`
    CREATE TABLE icons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        svg TEXT NOT NULL,
        tags TEXT
    );

    CREATE INDEX idx_name ON icons(name);
    CREATE INDEX idx_tags ON icons(tags);
    `);

    const insertIcon = sqlite.prepare("INSERT INTO icons (name, svg, tags) VALUES ($name, $svg, $tags)")
    const insertManyIcons = sqlite.transaction((icons: IconObj[]) => {
        for (let i = 0; i < icons.length; i++) {
            const icon = icons[i];

            insertIcon.run({
                $name: icon.name.replaceAll("-", " "),
                $svg: icon.data,
                $tags: icon.tags
            })
        }
    })

    insertManyIcons((await iconsJson).default);
}

interface IconObj {
    name: string;
    data: string;
    tags: string;
}

export default sqlite;
