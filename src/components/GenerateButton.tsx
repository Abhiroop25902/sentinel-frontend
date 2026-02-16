import {createResource, createSignal, Match, Switch} from "solid-js";
import BackendConstants from "../constants/BackendConstants";

export default function GenerateButton() {
    const [hasBeenClicked, setHasBeenClicked] = createSignal(false);
    const [stressTest] = createResource(hasBeenClicked, async (clicked) => {
        if (!clicked) return;

        const res = await fetch(`${BackendConstants.HOST}${BackendConstants.PATHS.STRESS_TEST}`);

        if (res.status === 409) {
            throw new Error('Currently in Timeout');
        }

        const data = await res.json();
        console.log(data);
        return data;
    });

    return (
        <div class={""}>
            <button
                class={"bg-blue-600 px-6 py-3 w-56 h-12 rounded-lg font-semibold flex justify-center text-white"}
                disabled={hasBeenClicked()}
                onClick={() => {
                    setHasBeenClicked(true);
                }}>
                <Switch fallback={<div>Launch Stress Test</div>}>
                    <Match when={stressTest.loading}>
                        <div class="animate-spin rounded-full h-6 w-6 border-2 border-blue-300 border-t-transparent"/>
                    </Match>
                    <Match when={stressTest.error}>
                        <div>Currently in Timeout</div>
                    </Match>
                    <Match when={stressTest()}>
                        <div>Done</div>
                    </Match>
                </Switch>
            </button>
        </div>
    )
}