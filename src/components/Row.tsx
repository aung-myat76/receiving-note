import { useRef, type FC } from "react";
import Button from "./Button";
import type { RefType } from "./RefInput";
import RefInput from "./RefInput";
import type { SingleData } from "../store/note-context";

type RowType = {
    no: number;
    initialData: SingleData | undefined;
};

const Row: FC<RowType> = ({ no, initialData }) => {
    if (initialData === undefined) {
        initialData = {
            id: null,
            truckNo: "",
            plts: 16,
            loose: 0,
            start: "",
            finish: "",
            remark: "",
        };
    }

    const truckNoRef = useRef<RefType>(null);
    const pltsRef = useRef<RefType>(null);
    const looseRef = useRef<RefType>(null);
    const startRef = useRef<RefType>(null);
    const finishRef = useRef<RefType>(null);
    const remarkRef = useRef<RefType>(null);

    const handleStartTime = () => {
        startRef.current?.getNow();
    };

    const handleFinishTime = () => {
        finishRef.current?.getNow();
    };

    return (
        <tr className="border-b hover:bg-gray-50 transition">
            {/* Row Number */}
            <td className="px-3 py-2 text-sm text-gray-700 font-medium">
                {no + 1}
            </td>

            {/* Truck No */}
            <td className="px-3 py-2">
                <RefInput
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    defaultValue={initialData.truckNo}
                    ref={truckNoRef}
                    id="truckNo"
                />
            </td>

            {/* Plts */}
            <td className="px-3 py-2">
                <RefInput
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    defaultValue={initialData.plts}
                    ref={pltsRef}
                    id="plts"
                />
            </td>

            {/* Loose */}
            <td className="px-3 py-2">
                <RefInput
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    defaultValue={initialData.loose}
                    ref={looseRef}
                    id="loose"
                />
            </td>

            {/* Start Time + Button */}
            <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                    <RefInput
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        id="start"
                        defaultValue={initialData.start}
                        ref={startRef}
                    />
                    <Button
                        onClick={handleStartTime}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600 transition"
                    >
                        Now
                    </Button>
                </div>
            </td>

            {/* Finish Time + Button */}
            <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                    <RefInput
                        className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        id="finish"
                        defaultValue={initialData.finish}
                        ref={finishRef}
                    />
                    <Button
                        onClick={handleFinishTime}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600 transition"
                    >
                        Now
                    </Button>
                </div>
            </td>

            {/* Remark */}
            <td className="px-3 py-2">
                <RefInput
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    ref={remarkRef}
                    defaultValue={initialData.remark}
                    id="remark"
                />
            </td>
        </tr>
    );
};

export default Row;
