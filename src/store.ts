import {createStore} from "solid-js/store";
import {createEffect} from "solid-js";
import {LoginHistoryLog} from "./types/LoginHistoryLog";

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
    if (store.logs.length > 0) {
        const latestLog = store.logs[store.logs.length - 1];

        if (latestLog.success)
            setStore("loginCount", "success", count => count + 1);
        else
            setStore("loginCount", "fail", count => count + 1);

    }
})

createEffect(() => {
    if (store.loginCount.success > 0)
        setStore("lastSecondCount", "success", count => count + 1);
});

createEffect(() => {
    if (store.loginCount.fail > 0)
        setStore("lastSecondCount", "fail", count => count + 1);
});

