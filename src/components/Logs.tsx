import {createVirtualizer} from "@tanstack/solid-virtual";
import {createEffect, For, Show} from "solid-js";
import {store} from "../store";

export default function Logs() {
    let scrollElementRef;

    const rowVirtualizer = createVirtualizer({
        get count() {
            return store.logs.length
        },
        getScrollElement: () => scrollElementRef as any,
        estimateSize: () => 24,
        overscan: 10,
    });

    createEffect(() => {
        const count = store.logs.length;
        if (count === 0 || !scrollElementRef) return;

        const {scrollTop, scrollHeight, clientHeight} = scrollElementRef;
        // Check if user is within 50px of the bottom
        const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50;

        if (isAtBottom) {
            rowVirtualizer.scrollToIndex(count - 1, {align: "end"})
        }
    })


    return <div
        ref={scrollElementRef}
        class={"w-full text-gray-300 bg-slate-800 rounded-2xl grow-2 overflow-y-auto text-sm custom-scrollbar min-h-0 basis-0"}>
        <div style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
            "margin-left": `16px`,
            "margin-right": `16px`
        }}>
            <For each={rowVirtualizer.getVirtualItems()}>
                {(virtualItem) => {
                    const log = () => store.logs[virtualItem.index]

                    return (
                        <div
                            // @ts-ignore key error ignore
                            key={virtualItem.index}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: `${virtualItem.size}px`,
                                transform: `translateY(${virtualItem.start}px)`
                            }}>
                            <Show when={log()}>
                                <div class={`flex gap-2 h-6`}>
                                    <div class={"text-teal-200 w-48"}>
                                        {log().timestamp.toDate().toISOString()}
                                    </div>
                                    <div class={`grow`}>{log().email}</div>
                                    <div class={`${log().success ? "text-green-500" : 'text-red-500'}`}>
                                        {log().success ? "SUCCESS" : "FAIL"}
                                    </div>
                                </div>
                            </Show>
                        </div>

                    )
                }}
            </For>
        </div>
    </div>
}