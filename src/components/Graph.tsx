import {setStore, store} from "../store";
import {createSignal, onCleanup} from "solid-js";


export default function Graph() {
    const [lastSecondSuccessCount, setLastSecondSuccessCount] = createSignal(0);
    const [lastSecondFailCount, setLastSecondFailCount] = createSignal(0);

    const timer = setInterval(() => {
        // making separate variable cause store change will happen before setStore callback happens
        const lastSecondSuccessCount = store.lastSecondCount.success;
        const lastSecondFailCount = store.lastSecondCount.fail
        setLastSecondSuccessCount(lastSecondSuccessCount);
        setLastSecondFailCount(lastSecondFailCount);

        setStore("lastSecondCount", "success", num => num - lastSecondSuccessCount);
        setStore("lastSecondCount", "fail", num => num - lastSecondFailCount);
    }, 1000);

    onCleanup(() => clearInterval(timer));

    return (
        <div class={`w-full flex items-center justify-center text-gray-300 
        bg-slate-800 rounded-2xl basis-3 grow-4 flex-col`}>
            <div>{`Last Second Success: ${lastSecondSuccessCount()}`}</div>
            <div>{`Last Second Fail: ${lastSecondFailCount()}`}</div>
        </div>
    )
}