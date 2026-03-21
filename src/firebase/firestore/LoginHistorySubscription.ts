import {setStore} from "../../store";

export function subscribeToLoginHistory() {
    const worker = new Worker(new URL("./LoginHistorySubscription.worker.ts", import.meta.url), {type: "module"});

    worker.onmessage = (message) => {
        const {batchSuccessCount, batchFailureCount} = message.data;
        setStore(store => {
            return {
                loginCount: {
                    success: store.loginCount.success + batchSuccessCount,
                    fail: store.loginCount.fail + batchFailureCount,
                },
                lastSecondCount: {
                    success: store.lastSecondCount.success + batchSuccessCount,
                    fail: store.lastSecondCount.fail + batchFailureCount,
                }
            }
        });
    }

    worker.postMessage(WebWorkerConstants.START);

    console.info("Subscribing to login history");
}