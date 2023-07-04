import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

import Spinner from "@phosphor-icons/core/assets/regular/spinner.svg";

export default function InfiniteScroll({
    isLoading = () => false,
    setLoading = () => {},
    goFetch,
    isEnded = () => false,
    children = () => {},
    infiniteScrollContainerProps,
}) {
    const [reachEnd, setReachEnd] = createSignal(false);

    const handleScroll = (e) => {
        setReachEnd(() => {
            if (isEnded()) return false;
            return (
                e.target.scrollTop + window.innerHeight >= e.target.scrollHeight - 10
            );
        });
        if (reachEnd() && isLoading() == false) {
            setLoading(true);
            goFetch();
        }
    };

    onMount(() => {
        let od = document.getElementById("overflow-div");
        od.addEventListener("scroll", handleScroll);
    });

    onCleanup(() => {
        let od = document.getElementById("overflow-div");
        od.removeEventListener("scroll", handleScroll);
    });

    return (
        <div class="infinite-scroll" {...infiniteScrollContainerProps}>
            {children()}
            <Show when={isLoading()}>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        "align-items": "center",
                        "justify-content": "center",
                    }}
                >
                    <img class="loading" draggable={false} src={Spinner} />
                </div>
            </Show>
        </div>
    );
}
