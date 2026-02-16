import {Component} from 'solid-js';
import Graph from "./components/Graph";
import Logs from "./components/Logs";
import Header from "./components/Header";
import KPI from "./components/KPI";


const App: Component = () => {


    return (
        <div class="bg-slate-900 min-h-screen w-full flex flex-col gap-4 p-4">
            <Header/>
            <KPI/>
            <Graph/>
            <Logs/>
        </div>
    );
};

export default App;
