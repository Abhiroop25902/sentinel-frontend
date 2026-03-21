import {Component, createEffect} from 'solid-js';
import Graph from "./components/Graph";
import Header from "./components/Header";
import KPI from "./components/KPI";
import {subscribeToLoginHistory} from "./firebase/firestore/LoginHistorySubscription";


const App: Component = () => {

    createEffect(() => {
        const unsub = subscribeToLoginHistory();

        return () => {
            console.info("Unsubscribing login history");
            unsub();
        }
    }, [])

    return (
        <div class="bg-slate-900 min-h-screen w-full flex flex-col gap-4 p-4">
            <Header/>
            <KPI/>
            <Graph/>
        </div>
    );
};

export default App;
