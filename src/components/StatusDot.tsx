import BackendConstants from "../constants/BackendConstants";
import {createResource, Match, Show, Switch} from "solid-js";

export default function StatusDot() {
    const healthUri = `${BackendConstants.HOST}${BackendConstants.PATHS.HEALTH}`
    const fetchHealth = async () => {
        const response = await fetch(healthUri);
        return await response.json();
    }

    const [health] = createResource(fetchHealth);

    return (
        <div>
            <Show when={health.loading}>
                <div class={`border-amber-500 border-2 w-5 h-5 rounded-full`}></div>
            </Show>
            <Switch>
                <Match when={health.error}>
                    <div class={`bg-red-500 w-5 h-5 rounded-full`}></div>
                </Match>
                <Match when={health()}>
                    <div class={`bg-emerald-500 w-5 h-5 rounded-full`}></div>
                </Match>
            </Switch>
        </div>
    )
}