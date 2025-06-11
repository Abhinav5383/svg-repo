import { useSearchParams } from "@solidjs/router";
import { SearchIcon } from "lucide-solid";
import { TextField, TextFieldInput } from "~/components/ui/text-field";

export default function Navbar() {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <header class="py-3 border-b border-border shadow shadow-muted">
            <nav class="container grid grid-cols-[auto_1fr] items-center">
                <span class="text-xl font-bold font-mono">SVG Icons</span>

                <div class="w-fit relative flex items-center justify-center place-self-end">
                    <TextField>
                        <label for="search-input" class="absolute start-3 top-[50%] -translate-y-[50%]">
                            <SearchIcon class="w-4 h-4 text-muted-foreground" />
                        </label>
                        <TextFieldInput
                            id="search-input"
                            class="text-base min-w-0 w-[32ch] ps-9"
                            placeholder="Search icons..."
                            value={searchParams?.q}
                            onChange={(e) => {
                                setSearchParams({ q: e.target.value || "", page: undefined });
                            }}
                        />
                    </TextField>
                </div>
            </nav>
        </header>
    );
}
