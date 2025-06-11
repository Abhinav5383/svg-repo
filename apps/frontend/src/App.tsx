import { useSearchParams } from "@solidjs/router";
import { For, Show, createResource } from "solid-js";
import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationItems,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination";
import { Toaster } from "~/components/ui/toast";
import Navbar from "./components/layout/navbar";
import IconCard from "./icon-card";
import type { Icons_SearchRes } from "./types";

const PAGE_SIZE = 200;

export default function Root() {
    const [searchParams, setSearchParams] = useSearchParams();

    const page_and_query = () => `${searchParams.q}-${searchParams.page}`;

    const [data] = createResource(page_and_query, async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search?q=${searchParams.q || ""}&page=${searchParams.page || ""}`);
        return (await res.json()) as Icons_SearchRes;
    });

    function PaginationComponent() {
        return (
            <Show when={(data()?.totalHits || 0) / PAGE_SIZE > 1}>
                <Pagination
                    class="place-self-center"
                    page={Number.parseInt((searchParams?.page as string) || "1")}
                    onPageChange={(page) => {
                        if (page > 1) setSearchParams({ page: page });
                        else setSearchParams({ page: undefined });
                    }}
                    count={Math.ceil((data()?.totalHits || 0) / PAGE_SIZE)}
                    fixedItems
                    itemComponent={(props) => <PaginationItem page={props.page}>{props.page}</PaginationItem>}
                    ellipsisComponent={() => <PaginationEllipsis />}
                >
                    <PaginationPrevious />
                    <PaginationItems />
                    <PaginationNext />
                </Pagination>
            </Show>
        );
    }

    return (
        <div class="w-full grid">
            <Navbar />

            <div class="container grid my-8 gap-6">
                {<PaginationComponent />}

                <Show when={data.loading}>
                    <div class="grid justify-center h-[100vh]">
                        <span class="font-mono text-muted-foreground text-xl my-16">Loading...</span>
                    </div>
                </Show>

                <Show when={!data.loading}>
                    <div class="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-5 place-self-center place-content-center items-start">
                        <For each={data()?.icons}>{(icon) => <IconCard icon={icon} />}</For>
                    </div>
                </Show>

                {<PaginationComponent />}
            </div>

            <Toaster />
        </div>
    );
}
