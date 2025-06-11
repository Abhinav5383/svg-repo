import { CopyIcon, DownloadIcon } from "lucide-solid";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "~/components/ui/dialog";
import { showToast } from "~/components/ui/toast";
import "./card.css";
import type { Icon } from "./types";

interface Props {
    icon: Icon;
}

export default function IconCard(props: Props) {
    const iconName = () => props.icon.name.replaceAll(" ", "-");

    function copySvg() {
        try {
            navigator.clipboard.writeText(props.icon.svg);
            showToast({
                title: `${iconName()}.svg Copied to clipboard!`,
            });
        } catch (error) {
            showToast({
                title: "Unable to access clipboard!",
                variant: "error",
            });
        }
    }

    function downloadSvg() {
        showToast({
            title: `Downloading ${iconName()}.svg ...`,
        });

        try {
            // Create a Blob from the SVG text
            const blob = new Blob([props.icon.svg], { type: "image/svg+xml" });

            // Create a URL htmlFor the Blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Create a download link
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = `${iconName()}.svg`; // Specify the filename

            // Trigger a click event to initiate the download
            a.click();

            // Release the Blob URL
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            showToast({
                // @ts-ignore
                title: error?.message ?? `Error downloading file ${iconName()}.svg`,
                variant: "error",
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger class="contents">
                <div class="group/card grid cursor-pointer">
                    <div
                        class="aspect-[3/2] icon bg-muted flex items-center justify-center rounded-md group-hover/card:text-blue-400"
                        innerHTML={props.icon.svg}
                    />

                    <span class="text-muted-foreground group-hover/card:text-blue-400 flex items-center justify-center text-sm my-1 break-words text-center">
                        {iconName()}
                    </span>
                </div>
            </DialogTrigger>

            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader class="text-lg">{iconName()}</DialogHeader>

                <div
                    class="aspect-[3/2] icon bg-muted flex items-center justify-center rounded-md group-hover/card:text-blue-400"
                    innerHTML={props.icon.svg}
                    style={{
                        "--svg-width": "75%",
                        "--svg-height": "75%",
                    }}
                />

                <div class="w-full flex gap-4 items-center justify-end">
                    <Button variant="secondary" onclick={copySvg}>
                        <CopyIcon />
                        Copy
                    </Button>

                    <Button variant="secondary" onclick={downloadSvg}>
                        <DownloadIcon />
                        Download
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
