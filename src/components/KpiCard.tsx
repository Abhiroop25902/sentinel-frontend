import {Show} from "solid-js";

type HeaderCardProps = {
    title: string;
    value: () => number;
    percentage?: () => number;
    type?: 'success' | 'fail'
}

export default function KpiCard({title, value, percentage, type}: HeaderCardProps) {
    const valueColor = (() => {
        switch (type) {
            case 'success':
                return 'text-emerald-500';
            case 'fail':
                return 'text-rose-500';
            default:
                return '';
        }
    })();

    return (
        <div
            class={`bg-slate-800 rounded-2xl p-4 text-gray-300 grow shrink-0 flex flex-col justify-between basis-0 gap-4`}>
            <div class={`font-extrabold text-2xl`}>{title}</div>
            <div class={`flex items-end justify-between ${valueColor}`}>
                <div class={`font-extrabold text-5xl`}>{value()}</div>
                <Show when={percentage}>
                    {(p) => (
                        <div>{`${p()().toFixed(2)}%`}</div>
                    )
                    }
                </Show>

            </div>

        </div>
    )
}