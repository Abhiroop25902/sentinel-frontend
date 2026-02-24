import {createSignal, onCleanup} from "solid-js";
import {store} from "../store";

export default function KPI() {

    const [totalLoginSuccessCount, setTotalLoginSuccessCount] = createSignal(0);
    const [totalLoginFailCount, setTotalLoginFailCount] = createSignal(0);

    const timer = setInterval(() => {
        setTotalLoginSuccessCount(store.loginCount.success);
        setTotalLoginFailCount(store.loginCount.fail);
    }, 1000);

    onCleanup(() => clearInterval(timer));

    return (
        <div class={`w-full flex items-center justify-center text-gray-300 
        bg-slate-800 rounded-2xl grow flex-col`}>
            <div>{`Total Success Count: ${totalLoginSuccessCount()}`}</div>
            <div>{`Total Fail Count: ${totalLoginFailCount()}`}</div>
        </div>
    )
}