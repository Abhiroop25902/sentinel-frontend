import {createSignal, onCleanup} from "solid-js";
import {store} from "../store";
import KpiCard from "./KpiCard";

export default function KPI() {

    const [totalLoginSuccessCount, setTotalLoginSuccessCount] = createSignal(0);
    const [totalLoginFailCount, setTotalLoginFailCount] = createSignal(0);

    const totalLoginCount = () => totalLoginSuccessCount() + totalLoginFailCount();
    const successPercentage = () => {
        const total = totalLoginCount()
        if (total == 0) return 0;
        return totalLoginSuccessCount() / total * 100
    };
    const failPercentage = () => {
        const total = totalLoginCount()
        if (total == 0) return 0;
        return totalLoginFailCount() / total * 100;
    }

    const timer = setInterval(() => {
        setTotalLoginSuccessCount(store.loginCount.success);
        setTotalLoginFailCount(store.loginCount.fail);
    }, 1000);

    onCleanup(() => clearInterval(timer));

    return (
        <div class={`w-full gap-4 flex`}>

            <KpiCard title={`Total Logins`} value={totalLoginCount}/>
            <KpiCard title={`Successful Logins`} value={totalLoginSuccessCount} percentage={successPercentage}
                     type={`success`}/>
            <KpiCard title={`Failed Logins`} value={totalLoginFailCount} percentage={failPercentage} type={`fail`}/>
        </div>
    )
}