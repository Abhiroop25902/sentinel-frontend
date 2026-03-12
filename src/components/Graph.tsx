import {setStore} from "../store";
import {createSignal, onCleanup} from "solid-js";
import {LineChart} from "./SolidUIChart/charts";
import {formatDate} from "../utils/utils";
import colors from 'tailwindcss/colors'

const successLabel = "Successful Logins"
const successColor = colors.emerald[500];
const failLabel = "Failed Logins"
const failureColor = colors.rose[500];
const textColor = colors.gray[300];

export default function Graph() {
    const [successHistory, setSuccessHistory] = createSignal<Array<number | null>>(Array.from({length: 60}, _ => null));
    const [failHistory, setFailHistory] = createSignal<Array<number | null>>(Array.from({length: 60}, _ => null));
    const currentTime = new Date().getTime();
    const [timeLabel, setTimeLabel] = createSignal(Array.from({length: 60}, (_, i) => {
        return formatDate(new Date(currentTime - (59 - i) * 1000))
    }));
    const [hideSuccessGraph, setHideSuccessGraph] = createSignal(false)
    const [hideFailGraph, setHideFailGraph] = createSignal(false)

    const timer = setInterval(() => {
        // making separate variable cause store change will happen before setStore callback happens
        let lastSecondSuccessCount = 0;
        let lastSecondFailCount = 0;

        // setStore executes callback synchronously, also as js is single threaded,
        // only this callback will be executed at this time
        setStore("lastSecondCount", (prev) => {
            lastSecondSuccessCount = prev.success;
            lastSecondFailCount = prev.fail;
            return {success: 0, fail: 0}; // In this context, resetting to 0 is safe because prev is the absolute current state
        });
        setSuccessHistory([...successHistory().slice(1), lastSecondSuccessCount]);
        setFailHistory([...failHistory().slice(1), lastSecondFailCount]);
        setTimeLabel([...timeLabel().slice(1), formatDate(new Date())])
    }, 1000);

    onCleanup(() => clearInterval(timer));

    return (
        <div class={`w-full flex items-center justify-center text-gray-300
        bg-slate-800 rounded-2xl basis-0 grow-3 flex-col min-h-0`}>
            <div class={`p-4 w-full h-full`}>
                <LineChart
                    data={{
                        xLabels: timeLabel(),
                        datasets: [
                            {
                                label: successLabel,
                                data: successHistory(),
                                borderColor: successColor,
                                backgroundColor: successColor,
                                pointBackgroundColor: successColor,
                                tension: 0.5,
                                borderWidth: 1.5,
                                pointStyle: false,
                                hidden: hideSuccessGraph(),

                            },
                            {
                                label: failLabel,
                                data: failHistory(),
                                fill: false,
                                borderColor: failureColor,
                                backgroundColor: failureColor,
                                pointBackgroundColor: failureColor,
                                tension: 0.5,
                                borderWidth: 1.5,
                                pointStyle: false,
                                hidden: hideFailGraph()
                            }
                        ],
                    }}
                    options={{
                        animation: false,
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                border: {display: false},
                                grid: {display: false},
                                title: {
                                    display: true,
                                    text: "Time",
                                    color: textColor
                                },
                                ticks: {
                                    color: textColor,
                                    maxTicksLimit: 6,
                                    autoSkip: true,
                                    maxRotation: 0,
                                    minRotation: 0,
                                }
                            },
                            y: {
                                border: {
                                    dash: [3],
                                    dashOffset: 3,
                                    display: false
                                },
                                grid: {
                                    color: "hsla(240, 3.8%, 46.1%, 0.4)"
                                },
                                title: {
                                    display: true,
                                    text: "Logins per Second",
                                    color: textColor
                                },
                                ticks: {
                                    color: textColor
                                }

                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                align: "end",
                                labels: {
                                    boxWidth: 6,
                                    boxHeight: 6,
                                    color: textColor,
                                    font: {size: 14},
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                },
                                onClick: (_, legendItem) => {
                                    if (legendItem.text === successLabel) setHideSuccessGraph(!hideSuccessGraph());
                                    else setHideFailGraph(!hideFailGraph());
                                }

                            },
                            tooltip: {
                                enabled: false,
                            },
                        },
                    }}

                />
            </div>

        </div>
    )
}