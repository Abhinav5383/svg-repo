import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const zeroWidthSpace = "\u200B";

export function AllowWordBreaks(str: string | undefined, chars: string[]) {
    if (!str || !chars?.length) return null;

    let result = str;

    for (const char of chars) {
        let temp = "";

        const items = result.split(char);
        for (let i = 0; i < items.length; i++) {
            if (items[i + 1] === undefined) temp += items[i];
            else temp += `${items[i]}${zeroWidthSpace}${char}`;
        }

        result = temp;
    }

    return result;
}
