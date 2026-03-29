import {
    useRef,
    useState,
    type FC,
    type FormEvent,
    type ReactNode
} from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { getTime } from "../util/getTime";
import cn from "../util/cn";
import useNote from "../hooks/useNote";

type ModalType = {
    children: ReactNode;
    isOpen: boolean;
    item: string;
    pageId: string;
    onClose: () => void;
    onConfirm: () => void;
};

// const checkTotalPallets = (isYDC: string, item: string) => {
//     const isQt = item.trim().toLowerCase().includes("qt");

//     if (isQt && isYDC === "YDC") {
//         return 18;
//     } else {
//         return 16;
//     }
//     // if (item.trim().toLowerCase().includes("30")) {
//     //     return 42;
//     // } else if (item.trim().toLowerCase().includes("10")) {
//     //     return 32;
//     // } else {
//     //     if (nowHour >= 6 && nowHour <= 18) {
//     //         if (
//     //             (truckNo === "7Q/3929" ||
//     //                 truckNo === "7Q/3911" ||
//     //                 truckNo === "7Q/3891") &&
//     //             item.trim().toLowerCase().includes("qt")
//     //         ) {
//     //             return 18;
//     //         } else {
//     //             return 16;
//     //         }
//     //     } else {
//     //         return 16;
//     //     }
//     // }
// };

const TruckModal: FC<ModalType> = ({
    children,
    isOpen,
    // item,
    pageId,
    onClose,
    onConfirm
}) => {
    const modalRoot = document.getElementById("modal-root");
    const formRef = useRef(null);
    const truckRef = useRef<HTMLInputElement | null>(null);
    const pltRef = useRef<HTMLInputElement | null>(null);
    const looseRef = useRef<HTMLInputElement | null>(null);
    const startRef = useRef<HTMLInputElement | null>(null);
    const endRef = useRef<HTMLInputElement | null>(null);
    const remarkRef = useRef<HTMLTextAreaElement | null>(null);
    const [isMBLTruck, setIsMBLTruck] = useState("MBL");
    // const [isYDC, setIsYDC] = useState("CWH");
    const { addData } = useNote();
    if (!modalRoot) return null;

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const formObj = Object.fromEntries(formData.entries());
            console.log(formObj);
            const obj = {
                id: formObj.id.toString(),
                truckNo: formObj.truck.toString(),
                plts: +formObj.plt,
                loose: +formObj.loose,
                start: formObj.start.toString(),
                finish: formObj.end.toString(),
                remark: formObj.remark.toString()
            };
            if (formObj.truck.toString()) {
                addData(obj, pageId);
                onClose();
            }
        }
    };

    const baseBtn = "p-2 rounded-md bg-stone-300 text-white font-bold";

    return createPortal(
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="absolute inset-0 flex justify-center items-center w-full bg-stone-500/50">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-80 p-5 rounded-lg bg-white text-stone-900">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg text-start mb-3 font-semibold">
                                {children}
                            </h2>
                            <Button
                                className="btn btn-secondary"
                                onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                        <div>
                            <div className="center-row gap-3 mb-3">
                                <Button
                                    className={cn(
                                        baseBtn,
                                        isMBLTruck === "MBL"
                                            ? "bg-blue-600"
                                            : ""
                                    )}
                                    onClick={() => setIsMBLTruck("MBL")}>
                                    MBL Trucks
                                </Button>
                                <Button
                                    className={cn(
                                        baseBtn,
                                        isMBLTruck === "Other"
                                            ? "bg-blue-600"
                                            : ""
                                    )}
                                    onClick={() => setIsMBLTruck("Other")}>
                                    Other Trucks
                                </Button>
                            </div>
                            {/* <div className="center-row gap-3 mb-3">
                                <Button
                                    className={cn(
                                        baseBtn,
                                        isYDC === "CWH" ? "bg-blue-600" : ""
                                    )}
                                    onClick={() => setIsYDC("CWH")}>
                                    CWH
                                </Button>
                                <Button
                                    className={cn(
                                        baseBtn,
                                        isYDC === "YDC" ? "bg-blue-600" : ""
                                    )}
                                    onClick={() => setIsYDC("YDC")}>
                                    MBL YDC
                                </Button>
                            </div> */}
                            <form
                                ref={formRef}
                                onSubmit={handleFormSubmit}
                                className="flex flex-col items-start justify-start gap-3 mb-5">
                                <div>
                                    <input
                                        name="id"
                                        value={Math.random()}
                                        type="hidden"
                                    />
                                    <div className="">
                                        {isMBLTruck === "MBL" && (
                                            <div className="flex items-center gap-2">
                                                <label
                                                    className="w-20"
                                                    htmlFor="truckno">
                                                    Truck no
                                                </label>
                                                <select
                                                    id="truckno"
                                                    className="bg-stone-200 block p-2 w-40 rounded-md font-bold"
                                                    name="truck">
                                                    <option value={""}>
                                                        MBL Trucks
                                                    </option>
                                                    <option value={"1D/7075"}>
                                                        1D/7075
                                                    </option>
                                                    <option value={"1D/7076"}>
                                                        1D/7076
                                                    </option>
                                                    <option value={"7Q/3929"}>
                                                        7Q/3929
                                                    </option>
                                                    <option value={"7Q/3911"}>
                                                        7Q/3911
                                                    </option>
                                                    <option value={"7Q/3891"}>
                                                        7Q/3891
                                                    </option>
                                                </select>
                                            </div>
                                        )}
                                        {isMBLTruck === "Other" && (
                                            <div className="center-row gap-2">
                                                <label
                                                    className="w-20"
                                                    htmlFor="truckno">
                                                    Truck no
                                                </label>
                                                <input
                                                    ref={truckRef}
                                                    onChange={(e) =>
                                                        (truckRef.current!.value =
                                                            e.target.value)
                                                    }
                                                    id="truckno"
                                                    name="truck"
                                                    placeholder="no."
                                                    className="py-2 font-bold w-40  bg-stone-200 px-2 rounded-md"
                                                    // placeholder="Truck no."
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="center-row justify-between gap-2">
                                    <label className="w-20" htmlFor="plt">
                                        Pallet
                                    </label>
                                    <input
                                        ref={pltRef}
                                        onChange={(e) =>
                                            (pltRef.current!.value =
                                                e.target.value)
                                        }
                                        id="plt"
                                        type="number"
                                        name="plt"
                                        className="py-2 font-bold  w-20 bg-stone-200 px-2 rounded-md"
                                        defaultValue={16}
                                    />
                                    {/* <span
                                        onClick={() =>
                                            (pltRef.current!.value = "16")
                                        }
                                        className={cn(
                                            "w-10 text-center p-1 text-white rounded-sm ",
                                            pltRef.current!.value === "16"
                                                ? "bg-blue-600"
                                                : "bg-stone-400"
                                        )}>
                                        16
                                    </span>
                                    <span
                                        onClick={() =>
                                            (pltRef.current!.value = "18")
                                        }
                                        className={cn(
                                            "w-10 text-center p-1 text-white rounded-sm ",
                                            pltRef.current!.value === "18"
                                                ? "bg-blue-600"
                                                : "bg-stone-400"
                                        )}>
                                        18
                                    </span> */}
                                </div>
                                <div className="center-row gap-2">
                                    <label className="w-20" htmlFor="loose">
                                        Loose
                                    </label>
                                    <input
                                        ref={looseRef}
                                        onChange={(e) =>
                                            (looseRef.current!.value =
                                                e.target.value)
                                        }
                                        className="py-2 font-bold  w-40 bg-stone-200 px-2 rounded-md"
                                        id="loose"
                                        name="loose"
                                        type="number"
                                        defaultValue={"0"}
                                    />
                                </div>
                                <div className="center-row gap-2">
                                    <label className="w-20" htmlFor="start">
                                        Start
                                    </label>
                                    <input
                                        ref={startRef}
                                        onChange={(e) =>
                                            (startRef.current!.value =
                                                e.target.value)
                                        }
                                        className="py-2 font-bold  w-40 bg-stone-200 px-2 rounded-md"
                                        id="start"
                                        name="start"
                                        defaultValue={getTime()}
                                    />
                                </div>
                                <div className="center-row gap-2">
                                    <label className="w-20" htmlFor="end">
                                        End
                                    </label>
                                    <input
                                        ref={endRef}
                                        onChange={(e) =>
                                            (endRef.current!.value =
                                                e.target.value)
                                        }
                                        className="py-2 font-bold  w-40 bg-stone-200 px-2 rounded-md"
                                        id="end"
                                        name="end"
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label className="w-20" htmlFor="remark">
                                        Remark
                                    </label>
                                    <textarea
                                        ref={remarkRef}
                                        onChange={(e) =>
                                            (remarkRef.current!.value =
                                                e.target.value)
                                        }
                                        name="remark"
                                        className="py-2 font-bold  w-40 bg-stone-200 px-2 rounded-md"
                                        defaultValue=""></textarea>
                                </div>
                                <div>
                                    <Button
                                        className="btn btn-success"
                                        onClick={onConfirm}>
                                        Add Transfer
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <div className="action flex items-center justify-center gap-2"></div>
                    </div>
                </div>
            )}
        </>,
        modalRoot
    );
};

export default TruckModal;
