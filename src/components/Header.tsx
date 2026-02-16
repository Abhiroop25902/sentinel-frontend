import GenerateButton from "./GenerateButton";
import StatusDot from "./StatusDot";

export default function Header() {
    return (
        <div class={`w-full flex items-center justify-between text-gray-300`}>
            <div class={`flex items-center gap-4`}>
                <p class={"text-4xl font-extrabold font-stretch-110%"}>Sentinel</p>
                <StatusDot/>
            </div>

            <GenerateButton/>
        </div>
    );
}