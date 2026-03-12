import {createStore} from "solid-js/store";
import {createEffect} from "solid-js";
import {LoginHistoryLog} from "./types/LoginHistoryLog";

let nextIdxToProcess = 0;

export const [store, setStore] = createStore({
    loginCount: {
        success: 0,
        fail: 0,
    },
    lastSecondCount: {
        success: 0,
        fail: 0
    },
    logs: [] as Array<LoginHistoryLog>
})

createEffect(() => {
    if (nextIdxToProcess == store.logs.length) return;

    let successCountForUpdate = 0;
    let failCountForUpdate = 0;

    while (nextIdxToProcess <= store.logs.length - 1) {
        const log = store.logs[nextIdxToProcess];

        if (log.success) successCountForUpdate++;
        else failCountForUpdate++;

        nextIdxToProcess++;
    }

    setStore("loginCount", "success", count => count + successCountForUpdate);
    setStore("loginCount", "fail", count => count + failCountForUpdate);

    setStore('lastSecondCount', 'success', count => count + successCountForUpdate);
    setStore('lastSecondCount', 'fail', count => count + failCountForUpdate);

});

