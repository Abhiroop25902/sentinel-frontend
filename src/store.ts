import {createStore} from "solid-js/store";

export const [store, setStore] = createStore({
    loginCount: {
        success: 0,
        fail: 0,
    },
    lastSecondCount: {
        success: 0,
        fail: 0
    }
});

