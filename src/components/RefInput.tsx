import {
    forwardRef,
    useImperativeHandle,
    useRef,
    type ComponentPropsWithoutRef,
} from "react";

type RefInputType = {
    id: string;
} & ComponentPropsWithoutRef<"input">;

export interface RefType {
    getNow: () => void;
    getValue: () => string;
}

const getCurrentTime = () => {
    const d = new Date();
    const time = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Yangon",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(d);

    // const mmd = d.toLocaleString('en-US', {
    //     timeZone: 'Asia/Yangon'
    // })
    // const time = mmd.getHours() + 1 + ":" + mmd.getMinutes();
    return time;
};

const RefInput = forwardRef<RefType, RefInputType>(({ id, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        getNow() {
            inputRef.current!.value = getCurrentTime();
        },
        getValue() {
            return inputRef.current!.value;
        },
    }));

    return (
        <input
            ref={inputRef}
            {...props}
            name={id}
            onChange={(e) => (inputRef.current!.value = e.target.value)}
        />
    );
});

export default RefInput;
