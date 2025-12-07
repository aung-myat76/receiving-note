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
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Yangon",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(d);
};

const RefInput = forwardRef<RefType, RefInputType>(
    ({ id, className = "", ...props }, ref) => {
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
                className={`
                    w-full
                    px-1 py-0.5
                    text-xs sm:text-sm
                    bg-transparent
                    border-none
                    outline-none
                    focus:outline-none
                    focus:ring-0
                    focus:border-none
                    placeholder:text-gray-400
                    ${className}
                `}
                onChange={(e) => (inputRef.current!.value = e.target.value)}
            />
        );
    }
);

export default RefInput;
